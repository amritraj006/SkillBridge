import { Course } from "../models/Course.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const courseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);       
    }
    catch (error) {
        console.error("Error fetching course:", error.message);
        res.status(500).json({ message: "Server Error" });
    }   
}

