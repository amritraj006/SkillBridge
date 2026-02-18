import { serve } from "inngest/express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { inngest, functions } from "./inngest/index.js";
import courseRoutes from "./routes/courseRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const app = express();

// ✅ ENV check
const isProd = process.env.NODE_ENV === "production";

const allowedOrigins = isProd
  ? [
      "https://skillbridge-1-ggdj.onrender.com", // frontend
      "admin-url", // replace with real admin url
    ]
  : ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "ttp://localhost:5176"];

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
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.send("Welcome to the SkillBridge API!");
});

app.use("/api/courses", courseRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/user", userRoutes);


export default app;