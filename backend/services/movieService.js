const Movie = require("../models/movie");
const mongoose = require("mongoose");

// ✅ Fetch all movies
exports.getAllMovies = async () => {
  return await Movie.find();
};

// ✅ Search movies using regex
exports.searchMovies = async (query) => {
  return await Movie.find({
    title: { $regex: new RegExp(query, "i") }
  });
};

// ✅ Get a movie by ID with validation
exports.getMovieById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid movie ID format");
  }
  return await Movie.findById(id);
};
//creating a new movie
exports.createMovie = async (movieData) => {
  const newMovie = new Movie({
    _id: new mongoose.Types.ObjectId().toString(), // ✅ Generate a 24-character ID
    ...movieData,
  });
    return await newMovie.save();
  };
  exports.updateMovie = async (id, movieData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid movie ID format");
    }
  
    return await Movie.findByIdAndUpdate(id, movieData, { new: true });
  };

  //delete a movie 
 // In movieService.js
exports.deleteMovieById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid movie ID format");
    }
  
    // Use `findByIdAndDelete` to delete the movie
    const deletedMovie = await Movie.findByIdAndDelete(id);
  
    if (!deletedMovie) {
      throw new Error("Movie not found");
    }
  
    return deletedMovie;
  };
  exports.countMovies = async () => {
    return await Movie.countDocuments();
  };
  
  