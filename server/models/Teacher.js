import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Clerk userId

    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, trim: true },

    image: { type: String, default: "" },

    phone: { type: String, default: "" },

    // ✅ New Fields
    specialization: { type: String, default: "" }, // ex: MERN Stack, AI, Data Science

    skills: { type: [String], default: [] }, // ex: ["React", "Node.js", "MongoDB"]

    workingAt: { type: String, default: "" }, // ex: "Google", "XYZ College"

    experienceYears: { type: Number, default: 0 }, // ex: 2, 5, 10
  },
  { timestamps: true }
);

export const Teacher = mongoose.model("Teacher", teacherSchema);