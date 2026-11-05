import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { Course } from "./models/Course.js"; // adjust path if needed

dotenv.config();

const deleteAllCourse = async () => {
  try {
    await Course.deleteMany({});
    console.log("Existing courses cleared");
  } catch (error) {
    console.error(error);
  }
};

connectDB().then(deleteAllCourse);