import { serve } from "inngest/express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { inngest, functions } from "./inngest/index.js";
import connectDB from "./config/db.js";
import courseRoutes from "./routes/courseRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
}))

app.use(express.json());

connectDB();

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.send("Welcome to the SkillBridge API!");
});

app.use("/api/courses", courseRoutes);
app.use("/api/roadmap", roadmapRoutes);

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});