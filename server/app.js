import { serve } from "inngest/express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { inngest, functions } from "./inngest/index.js";
import courseRoutes from "./routes/courseRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

// ✅ Routes
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.send("Welcome to the SkillBridge API!");
});

app.use("/api/courses", courseRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/user", userRoutes);
app.use("/api/teachers", teacherRoutes);


export default app;