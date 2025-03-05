const express = require("express");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/admin", verifyToken, (req, res) => {
    res.json({ message: "Welcome Admin", user: req.user });
});

router.get("/manager", verifyToken, (req, res) => {
    res.json({ message: "Welcome Manager", user: req.user });
});

module.exports = router;
