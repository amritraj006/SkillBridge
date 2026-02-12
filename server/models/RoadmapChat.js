import mongoose from "mongoose";

const roadmapChatSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Clerk userId
    userEmail: { type: String, required: true },

    topic: { type: String, required: true }, // e.g. "Full Stack Developer"
    goal: { type: String, default: "" }, // optional

    roadmap: { type: String, required: true }, // AI response (Markdown)
  },
  { timestamps: true }
);

export default mongoose.model("RoadmapChat", roadmapChatSchema);