import express, { Request, Response } from "express";
import Photo from "@src/models/Photo";

const controller = express.Router();

controller.get(
    "/:id", async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        if (id) {
          const result = await Photo.find({author: id}).populate('author').sort({date: -1});
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
export default controller;