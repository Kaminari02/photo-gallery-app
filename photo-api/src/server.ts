import express from "express";
import logger from "jet-logger/lib";
import cors from "cors";
import mongoose from "mongoose";
import process from "process";
import userAuthController from '@src/controllers/auth.controller';
import photoController from '@src/controllers/photos.controller';
import usersController from '@src/controllers/users.controller';

const app = express();
const PORT = 8000;

const run = async () => {
  await mongoose.connect('mongodb://localhost/photo-api')

  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

// Middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// Controllers
app.use('/auth', userAuthController);
app.use('/photos', photoController);
app.use('/users', usersController);

run().catch((e) => logger.err(e)); 
