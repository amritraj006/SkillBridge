import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Learner",
    },
    message: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    achievement: {
      type: String,
      default: "Verified Learner",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);