import express from "express";
import { createUser, deleteUser, getAllUsers, getLoggedInUser, getTotalRevenue, getUserCount, updateUser } from "../controllers/userController.js"; // ✅ Add `.js`
import verifyToken from "../middleware/authMiddleware.js"; // ✅ Add `.js`


const router = express.Router();

// ✅ Define Routes
router.get("/me", verifyToken, getLoggedInUser);
router.get("/", verifyToken, getAllUsers);
router.post("/", verifyToken, createUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/count", verifyToken, getUserCount);
router.get("/total-revenue", verifyToken, getTotalRevenue);

export default router;
