import express from "express";
import * as cartController from "../controllers/cartController.js";
import { API } from "../utilities/apiRoutes.js";
const router = express.Router();

// Cart Operations
router.post(API.ADD_TO_CART, cartController.addToCart);
router.post(API.INITIATE_PAYMENT, cartController.initiatePayment);
router.patch(API.UPDATE_CART, cartController.updateCart);
router.get(API.GET_CART, cartController.getCart);
router.delete(API.REMOVE_FROM_CART, cartController.removeFromCart);
router.post(API.CONFIRM_PAYMENT, cartController.confirmPayment);
router.get(API.GET_ORDERS, cartController.getOrders);

export default router;
