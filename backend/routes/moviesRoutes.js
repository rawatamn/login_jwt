import express from "express";
import  { createMovie, createMovieCount, deleteMovie, getAllMovies, getMovieById, searchMovies, updateMovie } from "../controllers/movieController.js"; // ✅ Add `.js`
import { API } from "../utilities/apiRoutes.js";
const router = express.Router();

// ✅ Define Routes (ORDER MATTERS)
router.get(API.MOVIE_COUNT, createMovieCount); // ✅ Move this above `/:id`
router.get(API.ALL_MOVIES, getAllMovies);
router.get(API.SEARCH_MOVIE, searchMovies);
router.get(API.MOVIE_BY_ID, getMovieById); // Keep this last
router.post(API.CREATE_MOVIE, createMovie);
router.put(API.UPDATE_MOVIE, updateMovie);
router.delete(API.DELETE_MOVIE, deleteMovie);

export default router;
