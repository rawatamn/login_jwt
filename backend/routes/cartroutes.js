import express from "express";
import * as cartController from "../controllers/cartController.js";

const router = express.Router();

// ✅ Cart Operations
router.post("/", cartController.addToCart);
router.post("/initiate-payment", cartController.initiatePayment);
router.patch("/update/:userId/:movieId", cartController.updateCart);
router.get("/:userId", cartController.getCart);
router.delete("/:userId/:movieId", cartController.removeFromCart);
router.post("/confirm-payment", cartController.confirmPayment);
router.get("/orders/:userId", cartController.getOrders);

export default router;
