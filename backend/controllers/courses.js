import Course from "../models/course.js";
import HttpError from "../models/http-error.js";

export const getCourses = async (req, res, next) => {
  let courses;
  try {
    courses = await Course.find({});
  } catch (err) {
    const error = new HttpError("Fetching courses failed, please try again later.", 500);
    return next(error);
  }
  res.json({ courses: courses.map((course) => course.toObject({ getters: true })) });
};

export const getCourse = async (req, res, next) => {
  const id = req.params.id;

  let course;
  try {
    course = await Course.findById({ id });
  } catch (err) {
    const error = new HttpError("Fetching courses failed, please try again later.", 500);
    return next(error);
  }

  res.json({ course });
};
