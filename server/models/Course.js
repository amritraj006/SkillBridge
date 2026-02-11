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

    thumbnailUrl: { type: String, required: true }, // uploaded image

    youtubeUrl: { type: String, required: true, trim: true },

    notes: { type: String, default: "" },

    createdBy: { type: String, required: true },

    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);