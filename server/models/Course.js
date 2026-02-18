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

    // Teacher id (simple)
    createdBy: { type: String, required: true },

    // ✅ Admin approval system
    isApproved: { type: Boolean, default: false },
    approvedAt: { type: Date, default: null },

    totalEnrolled: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },

    enrolledStudents: [
      {
        studentId: { type: String, required: true },
        studentEmail: { type: String, required: true },
        enrolledAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);