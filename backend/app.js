import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

import HttpError from "./models/http-error.js";
import courseRoutes from "./routes/courses.js";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

app.use("", courseRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({ message: error.message || "An unknown error ocurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@edumap.78te4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=EDUMAP`
  )
  .then(() => {
    app.listen(5000);
    console.log("App is listening on port 5000.");
  })
  .catch((err) => {
    console.log(err);
  });
