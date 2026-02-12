import RoadmapChat from "../models/RoadmapChat.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is not set in environment variables!");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const generateRoadmap = async (req, res) => {
  try {
    const { userId, userEmail, topic, goal } = req.body;

    if (!userId || !userEmail) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a professional career mentor.
Create a clean structured roadmap for: "${topic}"

User goal: "${goal || "Not provided"}"

Return in Markdown format with:
1) Overview (2 lines)
2) Skills to learn (bullets)
3) 8-week plan (Week 1 to Week 8)
4) Projects (Beginner → Advanced)
5) Best free resources (YouTube, Docs)
6) Interview prep checklist

Keep it clear and short, not too long.
`;

    const result = await model.generateContent(prompt);
    const roadmapText = result.response.text();

    const newChat = await RoadmapChat.create({
      userId,
      userEmail,
      topic,
      goal,
      roadmap: roadmapText,
    });

    return res.status(201).json({
      message: "Roadmap generated successfully",
      chat: newChat,
    });
  } catch (error) {
    console.error("Generate Roadmap Error:", error.message || error);
    if (error.status) {
      console.error("API Status:", error.status);
    }
    return res.status(500).json({ 
      message: "Server error",
      error: error.message 
    });
  }
};

export const getUserRoadmaps = async (req, res) => {
  try {
    const { userId } = req.params;

    const chats = await RoadmapChat.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json(chats);
  } catch (error) {
    console.log("Get Roadmaps Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteSingleRoadmap = async (req, res) => {
  try {
    const { chatId } = req.params;

    await RoadmapChat.findByIdAndDelete(chatId);

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.log("Delete Single Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteAllRoadmaps = async (req, res) => {
  try {
    const { userId } = req.params;

    await RoadmapChat.deleteMany({ userId });

    return res.status(200).json({ message: "All history deleted successfully" });
  } catch (error) {
    console.log("Delete All Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};