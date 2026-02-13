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

    // ✅ NEW: Duration (example: "6 weeks" or "12 hours")
    duration: { type: String, required: true, default: "Not specified" },

    // ✅ NEW: Total seats / slots
    totalSlots: { type: Number, required: true, default: 50 },

    // ✅ NEW: Remaining slots (will reduce after enrollment)
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

    createdBy: { type: String, required: true },

    totalEnrolled: { type: Number, default: 0 },

    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);