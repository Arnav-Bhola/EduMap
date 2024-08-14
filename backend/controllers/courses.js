import Course from "../models/course.js";
import HttpError from "../models/http-error.js";

export default async (req, res, next) => {
  let courses;
  try {
    courses = await Course.find({});
  } catch (err) {
    const error = new HttpError("Fetching courses failed, please try again later.", 500);
    return next(error);
  }
  res.json({ courses: courses.map((course) => course.toObject({ getters: true })) });
};
