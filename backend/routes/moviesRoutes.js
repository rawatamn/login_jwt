const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

// ✅ Define Routes (ORDER MATTERS)
router.get("/moviecount", movieController.createMovieCount); // ✅ Move this above `/:id`
router.get("/", movieController.getAllMovies);
router.get("/search", movieController.searchMovies);
router.get("/:id", movieController.getMovieById); // Keep this last
router.post("/", movieController.createMovie);
router.put("/:id", movieController.updateMovie); 
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
