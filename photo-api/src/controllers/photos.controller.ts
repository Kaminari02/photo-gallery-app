import express, { Request, Response } from "express";
import Photo from "@src/models/Photo";
import { nanoid } from "nanoid";
import multer from "multer";
import path from "path";
import { uploadsPath } from "config";
import { CreatePhotoDto } from "@src/dto/CreatePhoto.dto";
import authMiddleware from "@src/middlewares/auth.middleware";
import { IRequest } from "@src/interfaces/IRequest";

const controller = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },
  filename(req, file, cb) {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

controller.get("/", async (req: Request, res: Response) => {
  try {
    const photos = await Photo.find().populate('author').sort({date: -1});
    res.send(photos);
  } catch (e) {
    res.sendStatus(500);
  }
});

controller.post(
  "/",
  upload.single("image"), authMiddleware,
  async (req: IRequest, res: Response) => {
    try {
      const { title } = req.body as CreatePhotoDto;
      let image = "";
      if (req.file) {
        image = req.file.filename;
      }
      if(!title || !image) {
        return res.status(500).send({error: 'You have to fill all fields'});
      }
      const photo = new CreatePhotoDto(title, image, req.user._id);
      const result = new Photo(photo);
      await result.save();
      res.send(result);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

controller.get(
  "/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (id) {
        const result = await Photo.findById(id).populate("author");
          if (result) {
            res.send(result);
          } else {
            res.sendStatus(404);
          }
      } else {
        return res.status(400).send({error: 'wrong id'});
      }
    } catch (e) {
      res.status(400).send(e);
      console.log(e)
    }
  }
);

controller.delete(
  "/:id", authMiddleware, async (req: IRequest, res: Response) => {
    const { id } = req.params;
    try {
        const reqPhoto = await Photo.find({_id: id, author: req.user._id});
        if(reqPhoto) {
            const result = await Photo.deleteOne({_id: id})
            res.send(result)
        } else {
            return res.status(404).send({error: 'User not found'});
        }
    } catch (error) {
      res.status(404).send("Error");
    }
  }
);

export default controller;