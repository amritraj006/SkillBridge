import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    // ✅ Clerk Teacher userId (unique)
    _id: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {type: String, default: ""},

    image: {
      type: String,
      required: true
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    expertise: {
      type: String,
      default: "General",
      trim: true,
    },

    // Optional social links
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    portfolio: { type: String, default: "" },

    // Optional approval system
    isApproved: {
      type: Boolean,
      default: true,
    },

    // ✅ Teacher Dashboard Stats
    totalCourses: {
      type: Number,
      default: 0,
    },

    totalStudents: {
      type: Number,
      default: 0,
    },

    totalRevenue: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Teacher = mongoose.model("Teacher", teacherSchema);