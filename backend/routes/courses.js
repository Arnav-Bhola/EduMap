import express from "express";

// import addCourses from "../controllers/addcourses.js";
import { getCourse, getCourses } from "../controllers/courses.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourse)

// router.post("/add", addCourses);

export default router;
