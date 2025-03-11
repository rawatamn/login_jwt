const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

// ✅ Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
