import mongoose from "mongoose";
import {nanoid} from 'nanoid';
import User from "../models/User";
import Photo from "../models/Photo";

mongoose.connect("mongodb://localhost/photo-api");

const db = mongoose.connection;

db.once("open", async () => {
  try {
    await db.dropCollection("users");
    await db.dropCollection("photos");
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }
  const [firstUser, secondUser, thirdUser] = await User.create(
    {
      username: "user",
      password: "123",
      token: nanoid(),
    },
    {
      username: "Charles Leclerc",
      password: "123",
      token: nanoid(),
    },
    {
      username: "Leonardo da Vinci",
      password: "123",
      token: nanoid(),
    },
  );

  const [firstPhoto, secondPhoto, thirdPhoto, fourthPhoto, fifthPhoto] = await Photo.create(
    {
      title: 'NGC 4414, a typical spiral galaxy in the constellation Coma Berenices',
      author: firstUser._id,
      image: 'galaxy.jpg',
      date: '2023-05-27T11:12:10.902+00:00'
    },
    {
      title: 'Beautiful Dubrovnik, city in Croatia',
      author: firstUser._id,
      image: 'Dubrovnik-Croatia.jpg',
      date: '2023-05-27T11:20:59.557+00:00'
    },
    {
      title: 'Monaco, Monte-Carlo',
      author: secondUser._id,
      image: 'Monaco.jpg',
      date: '2023-05-03T11:01:47.108+00:00'
    },
    {
      title: 'Mona Lisa',
      author: thirdUser._id,
      image: 'Mona_Lisa.webp',
      date: '2023-05-03T11:21:55.681+00:00'
    },
    {
      title: 'Última Cena',
      author: thirdUser._id,
      image: 'Última_Cena.jpg',
      date: '2023-05-03T11:21:55.681+00:00'
    },

  )

  await db.close();
});