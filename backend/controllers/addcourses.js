import Course from "../models/course.js";
import courses from "../test.json" assert { type: "json" };

const addCourses = async (req, res, next) => {
  try {
    for (const [name, courseData] of Object.entries(courses)) {
      const course = new Course({
        name,
        duration: courseData.duration,
        institution: courseData.institution,
        subject: courseData.subject,
        price: courseData.price.toLowerCase() === "free" ? 0 : parseFloat(courseData.price),
        level: courseData.level,
        prereqs: courseData.prereqs,
        authors: courseData.authors,
        link: courseData.link,
      });
      await course.save();
      console.log(`Course added: ${name}`);
    }
    console.log("All courses added successfully.");
  } catch (error) {
    console.error("Error adding courses: ", error);
  }

  res.status(201).json({ message: "Courses added sccuessfully." });
};

export default addCourses;
