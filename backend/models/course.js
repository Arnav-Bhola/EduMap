import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const courseSchema = new Schema(
  {
    name: { type: String, required: true },
    duration: { type: String, required: true },
    institution: { type: String, required: true },
    subject: { type: String, required: true },
    price: { type: Number, required: true },
    level: { type: String, required: true },
    prereqs: { type: String, required: true },
    authors: { type: [String], required: true },
    link: { type: String, required: true },
  },
  { collection: "Prod" }
);

export default model("Course", courseSchema);
