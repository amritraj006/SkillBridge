import express from "express";
import {
  getTeacherProfile,
  updateTeacherProfile,
} from "../controllers/teacherController.js";

const router = express.Router();

// Get teacher
router.get("/:teacherId", getTeacherProfile);

// Update teacher
router.put("/:teacherId", updateTeacherProfile);

export default router;