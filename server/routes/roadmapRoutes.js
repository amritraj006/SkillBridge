import express from "express";
import {
  generateRoadmap,
  getUserRoadmaps,
  deleteSingleRoadmap,
  deleteAllRoadmaps,
} from "../controllers/roadmapController.js";

const router = express.Router();

router.post("/generate", generateRoadmap);
router.get("/history/:userId", getUserRoadmaps);
router.delete("/delete/:chatId", deleteSingleRoadmap);
router.delete("/delete-all/:userId", deleteAllRoadmaps);

export default router;