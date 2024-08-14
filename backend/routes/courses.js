import express from "express";

// import addCourses from "../controllers/addcourses.js";
import getCourses from "../controllers/courses.js";

const router = express.Router();

router.get("/", getCourses);

// router.post("/add", addCourses);

export default router;
