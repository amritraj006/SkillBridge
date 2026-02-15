import { serve } from "inngest/express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { inngest, functions } from "./inngest/index.js";
import { inngest2, functions2 } from "./inngest/index2.js";

import courseRoutes from "./routes/courseRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";

dotenv.config();

const app = express();

// ✅ ENV check
const isProd = process.env.NODE_ENV === "production";

const allowedOrigins = isProd
  ? [
      "https://skillbridge-1-ggdj.onrender.com", // frontend
      "admin-url", // replace with real admin url
    ]
  : ["http://localhost:5173", "http://localhost:5174"];

// ✅ Verification logs
console.log("🔍 NODE_ENV:", process.env.NODE_ENV);
console.log("🌍 CORS Mode:", isProd ? "PRODUCTION" : "DEVELOPMENT");
console.log("✅ Allowed Origins:", allowedOrigins);

// ✅ Middlewares
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/inngest", serve({ client: inngest, functions, secret: process.env.USER_INNGEST_SIGNING_KEY }));
app.use("/api/inngest2", serve({ client: inngest2, functions: functions2, secret: process.env.TEACHER_INNGEST_SIGNING_KEY }));

app.get("/", (req, res) => {
  res.send("Welcome to the SkillBridge API!");
});

app.use("/api/courses", courseRoutes);
app.use("/api/roadmap", roadmapRoutes);

export default app;