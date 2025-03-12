const express = require("express");
const User = require("../models/user");
const verifyToken = require("../middleware/authMiddleware"); // Ensure correct path

const router = express.Router();

// ✅ Fetch Logged-in User Details
router.get("/me", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user details", error });
    }
});
// ✅ Fetch All Users (Admin Only)
router.get("/", verifyToken, async (req, res) => {
    try {
        // Ensure only  superadmins can fetch all users
        if ( req.user.role !== "superadmin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const users = await User.find().select("-password"); // Exclude passwords for security
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});

// ✅ Correct Export
module.exports = router;
