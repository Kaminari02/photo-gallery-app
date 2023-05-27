import { Schema, model } from "mongoose";

const PhotoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  }
});

const Photo = model("photo", PhotoSchema);

export default Photo;