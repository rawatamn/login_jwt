import Movie from "../models/movie.js"; // ✅ Add `.js`
import mongoose from "mongoose";

// ✅ Fetch all movies
export const getAllMovie = async () => {
  return await Movie.find();
};

// ✅ Search movies using regex
export const searchMovie = async (query) => {
  return await Movie.find({
    title: { $regex: new RegExp(query, "i") }
  });
};

// ✅ Get a movie by ID with validation
export const getMovieByIds = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid movie ID format");
  }
  return await Movie.findById(id);
};

// ✅ Create a new movie
export const createMovies = async (movieData) => {
  const newMovie = new Movie({
    ...movieData,
    _id: crypto.randomBytes(12).toString("hex"), // ✅ Ensure consistent 24-character string ID
  });
  return await newMovie.save();
};

// ✅ Update a movie
export const updateMovies = async (id, movieData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid movie ID format");
  }
  return await Movie.findByIdAndUpdate(id, movieData, { new: true });
};

// ✅ Delete a movie by ID
export const deleteMovieByIds = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid movie ID format");
  }

  const deletedMovie = await Movie.findByIdAndDelete(id);
  if (!deletedMovie) {
    throw new Error("Movie not found");
  }

  return deletedMovie;
};

// ✅ Count total movies
export const countMovie = async () => {
  return await Movie.countDocuments();
};
