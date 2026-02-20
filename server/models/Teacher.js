import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Clerk userId

    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, trim: true },

    image: { type: String, default: "" },

    phone: { type: String, default: "" },

    specialization: { type: String, default: "" },

    skills: { type: [String], default: [] },

    workingAt: { type: String, default: "" },

    experienceYears: { type: Number, default: 0 },

    // ✅ NEW
    location: { type: String, default: "" },

    website: { type: String, default: "" },

    bio: { type: String, default: ""},
  },
  { timestamps: true }
);

export const Teacher = mongoose.model("Teacher", teacherSchema);