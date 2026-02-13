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

// 2️⃣ Sample courses to insert
const sampleCourses = [
  {
    title: "React for Beginners",
    description: "Learn React from scratch and build amazing web apps.",
    category: "Web Development",
    level: "Beginner",
    duration: "6 weeks",
    totalSlots: 50,
    availableSlots: 50,
    price: 499,
    thumbnailUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dGcsHMXbSOA",
    notes: [
      {
        title: "React Basics Notes",
        fileUrl: "https://example.com/react-basics.pdf",
      },
    ],
    createdBy: "admin_123",
    isPublished: true,
  },
  {
    title: "Node.js & Express Masterclass",
    description: "Build REST APIs and full-stack apps using Node.js and Express.",
    category: "Backend Development",
    level: "Intermediate",
    duration: "8 weeks",
    totalSlots: 40,
    availableSlots: 40,
    price: 599,
    thumbnailUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
    notes: [
      {
        title: "Express Notes",
        fileUrl: "https://example.com/express-notes.pdf",
      },
    ],
    createdBy: "admin_123",
    isPublished: true,
  },
  {
    title: "Fullstack MERN Project",
    description:
      "Learn MERN stack by building a real-world project from scratch.",
    category: "Web Development",
    level: "Advanced",
    duration: "10 weeks",
    totalSlots: 30,
    availableSlots: 30,
    price: 799,
    thumbnailUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=7CqJlxBYj-M",
    notes: [
      {
        title: "MERN Project Notes",
        fileUrl: "https://example.com/mern-project.pdf",
      },
    ],
    createdBy: "admin_123",
    isPublished: true,
  },
];

// 3️⃣ Insert sample data
const insertSampleCourses = async () => {
  try {
    await Course.deleteMany(); // optional: clears old courses
    const createdCourses = await Course.insertMany(sampleCourses);

    console.log("Sample courses inserted successfully:");
    createdCourses.forEach((course) => console.log(course.title));

    process.exit(0);
  } catch (error) {
    console.error("Error inserting sample courses:", error.message);
    process.exit(1);
  }
};

// 4️⃣ Run
connectDB().then(insertSampleCourses);