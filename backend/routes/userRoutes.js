import express from "express";
import { createUser, deleteUser, getAllUsers, getLoggedInUser, getTotalRevenue, getUserCount, getUserRevenue, updateUser, } from "../controllers/userController.js"; // ✅ Add `.js`
import verifyToken from "../middleware/authMiddleware.js"; // ✅ Add `.js`
import { API } from "../utilities/apiRoutes.js";

const router = express.Router();

// ✅ Define Routes
router.get(API.ME, verifyToken, getLoggedInUser);
router.get(API.ALL_USERS, verifyToken, getAllUsers);
router.post(API.CREATE_USER, verifyToken, createUser);
router.put(API.UPDATE_USER, verifyToken, updateUser);
router.delete(API.DELETE_USER, verifyToken, deleteUser);
router.get(API.USER_COUNT, verifyToken, getUserCount);
router.get(API.TOTAL_REVENUE, verifyToken, getTotalRevenue);
router.get(API.USER_REVENUE, verifyToken, getUserRevenue);
export default router;
