import { userDetails, getAllUsers } from "../controllers/userController.js";
import { toggleCart, getCart, paymentSuccess} from "../controllers/userController.js";
import express from 'express'

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", userDetails);

router.get("/cart/:userId", getCart);

// toggle cart
router.post("/cart-toggle", toggleCart);

router.post("/payment-success", paymentSuccess);



export default router;