import express from "express";
import  { createMovie, createMovieCount, deleteMovie, getAllMovies, getMovieById, searchMovies, updateMovie } from "../controllers/movieController.js"; // ✅ Add `.js`

const router = express.Router();

// ✅ Define Routes (ORDER MATTERS)
router.get("/moviecount", createMovieCount); // ✅ Move this above `/:id`
router.get("/", getAllMovies);
router.get("/search", searchMovies);
router.get("/:id", getMovieById); // Keep this last
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
