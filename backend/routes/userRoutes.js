const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");

// ✅ Define Routes
router.get("/me", verifyToken, userController.getLoggedInUser);
router.get("/", verifyToken, userController.getAllUsers);
router.post("/", verifyToken, userController.createUser);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);
router.get("/count", verifyToken, userController.getUserCount);
module.exports = router;
