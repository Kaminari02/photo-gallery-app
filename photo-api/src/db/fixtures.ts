import mongoose from "mongoose";
import {nanoid} from 'nanoid';

mongoose.connect("mongodb://localhost/");

const db = mongoose.connection;

db.once("open", async () => {
  try {
    await db.dropCollection("");
    await db.dropCollection("");
    await db.dropCollection("");
    await db.dropCollection("");
    await db.dropCollection("");
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }


  await db.close();
});