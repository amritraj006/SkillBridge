import express from "express";
import {
  getTeacherProfile,
  updateTeacherProfile,
  getAllTeachers
} from "../controllers/teacherController.js";

const router = express.Router();

router.get("/", getAllTeachers);

// Get teacher
router.get("/:teacherId", getTeacherProfile);

// Update teacher
router.put("/:teacherId", updateTeacherProfile);

export default router;