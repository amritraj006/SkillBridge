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

    price: { type: Number, required: true, default: 0 },

    thumbnailUrl: { type: String, required: true },

    youtubeUrl: { type: String, required: true, trim: true },

    // ✅ Multiple notes support
    notes: [
      {
        title: { type: String, required: true }, // Example: "Chapter 1 Notes"
        fileUrl: { type: String, required: true }, // pdf/doc link
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