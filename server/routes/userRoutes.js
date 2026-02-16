import { userDetails, getAllUsers } from "../controllers/userController.js";
import express from 'express'

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", userDetails);

export default router;