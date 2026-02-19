import { userDetails, getAllUsers, getPurchasedCourses } from "../controllers/userController.js";
import { toggleCart, getCart, paymentSuccess} from "../controllers/userController.js";
import User from "../models/User.js";
import express from 'express'

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", userDetails);

router.get("/cart/:userId", getCart);

// toggle cart
router.post("/cart-toggle", toggleCart);

router.post("/payment-success", paymentSuccess);

router.get("/:userId/purchased-courses", getPurchasedCourses);



export default router;