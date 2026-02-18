import { Course } from "../models/Course.js";

// ✅ Teacher creates course (pending approval)
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      level,
      duration,
      totalSlots,
      price,
      thumbnailUrl,
      youtubeUrl,
      createdBy,
    } = req.body;

    if (
      !title ||
      !description ||
      !duration ||
      !thumbnailUrl ||
      !youtubeUrl ||
      !createdBy
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const course = await Course.create({
      title,
      description,
      category,
      level,
      duration,

      totalSlots: totalSlots || 50,
      availableSlots: totalSlots || 50,

      price: price || 0,
      thumbnailUrl,
      youtubeUrl,

      createdBy, // teacher clerk id

      // ✅ pending
      isApproved: false,
      approvedAt: null,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully. Waiting for admin approval.",
      course,
    });
  } catch (error) {
    console.log("❌ createCourse error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating course",
    });
  }
};

// ✅ Students: get only approved courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isApproved: true }).sort({
      createdAt: -1,
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Students: get course only if approved
export const courseById = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      isApproved: true,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Admin: Get pending courses

// ✅ Admin approves course (NO admin auth for now)
export const approveCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    course.isApproved = true;
    course.approvedAt = new Date();

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course approved successfully",
      course,
    });
  } catch (error) {
    console.log("❌ approveCourse error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while approving course",
    });
  }
};

export const getPendingCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isApproved: false }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log("❌ getPendingCourses error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching pending courses",
    });
  }
};


export const getTeacherAllCourses = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const courses = await Course.find({ createdBy: teacherId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log("❌ getTeacherAllCourses error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching teacher courses",
    });
  }
};

// ✅ Teacher: Get ONLY pending courses
export const getTeacherPendingCourses = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const courses = await Course.find({
      createdBy: teacherId,
      isApproved: false,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log("❌ getTeacherPendingCourses error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching pending courses",
    });
  }
};

// ✅ Teacher: Get ONLY approved courses
export const getTeacherApprovedCourses = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const courses = await Course.find({
      createdBy: teacherId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log("❌ getTeacherApprovedCourses error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching approved courses",
    });
  }
};