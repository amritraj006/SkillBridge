import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, default: "General" },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    duration: { type: String, required: true, default: "Not specified" },

    totalSlots: { type: Number, required: true, default: 50 },
    availableSlots: { type: Number, required: true, default: 50 },

    price: { type: Number, required: true, default: 0 },

    thumbnailUrl: { type: String, required: true },
    youtubeUrl: { type: String, required: true, trim: true },

    notes: [
      {
        title: { type: String, required: true },
        fileUrl: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    // ✅ Teacher reference (Clerk teacher id)
    teacherClerkId: { type: String, required: true },

    // ✅ Students stats
    totalEnrolled: { type: Number, default: 0 },

    // ✅ Course Revenue
    totalRevenue: { type: Number, default: 0 },

    // ✅ Optional: store enrolled students (recommended)
    enrolledStudents: [
      {
        studentClerkId: { type: String, required: true },
        studentEmail: { type: String, required: true },
        enrolledAt: { type: Date, default: Date.now },
      },
    ],

    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);