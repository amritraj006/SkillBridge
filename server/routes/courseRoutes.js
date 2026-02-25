import express from "express";
import {
  createCourse,
  getAllCourses,
  courseById,
  approveCourse,
  getPendingCourses,
  getTeacherAllCourses,
  getTeacherApprovedCourses,
  getTeacherPendingCourses,
  getTeacherCourseById,
  updateTeacherCourse,
  deleteCourse
} from "../controllers/courseController.js";

const router = express.Router();

/* ===========================
   TEACHER ROUTES
=========================== */

// ✅ Teacher creates course
router.post("/create", createCourse);

// ✅ Teacher: all courses
router.get("/teacher/:teacherId/all", getTeacherAllCourses);

// ✅ Teacher: pending courses
router.get("/teacher/:teacherId/pending", getTeacherPendingCourses);

// ✅ Teacher: approved courses
router.get("/teacher/:teacherId/approved", getTeacherApprovedCourses);

/* ===========================
   ADMIN ROUTES
=========================== */

// ✅ Admin: pending courses
router.get("/pending", getPendingCourses);

// ✅ Admin: approve course
router.put("/approve/:courseId", approveCourse);

/* ===========================
   STUDENT ROUTES
=========================== */

// ✅ Students see only approved courses
router.get("/", getAllCourses);

// ✅ Student opens only approved course
router.get("/:id", courseById);

router.get("/teacher/course/:courseId", getTeacherCourseById);

router.put("/teacher/update/:courseId", updateTeacherCourse);

// ✅ Admin: delete course
router.delete("/delete/:courseId", deleteCourse);

export default router;