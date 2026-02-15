import { userDetails } from "../controllers/userController.js";
import express from 'express'

const router = express.Router();

router.get("/:userId", userDetails);

export default router;