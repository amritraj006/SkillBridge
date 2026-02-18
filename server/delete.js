import mongoose from "mongoose";
import dotenv from "dotenv";
import { Course } from "./models/Course.js"; // adjust path if needed

dotenv.config();

// 1️⃣ Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const deleteAllCourse = async () => {
    try {
            await Course.deleteMany({});
            console.log("Existing courses cleared");
    } catch(error) {
        console.error(error);
    }
}


connectDB().then(deleteAllCourse);