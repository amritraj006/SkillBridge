import { Teacher } from "../models/Teacher.js";

// ✅ Get Teacher Profile
export const getTeacherProfile = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create or Update Teacher Profile
export const updateTeacherProfile = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const {
      name,
      email,
      image,
      phone,
      specialization,
      skills,
      workingAt,
      experienceYears,
      location,     // ✅ new
      website,      // ✅ new
      bio
    } = req.body;

    const teacher = await Teacher.findByIdAndUpdate(
      teacherId,
      {
        name,
        email,
        image,
        phone,
        specialization,
        skills,
        workingAt,
        experienceYears,
        location,    // ✅ new
        website,     // ✅ new
        bio
      },
      { new: true, upsert: true }
    );

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};