const movieService = require("../services/movieService");

// ✅ Get All Movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    res.json(movies);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Search Movies by Title (Regex)
exports.searchMovies = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const movies = await movieService.searchMovies(query);

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    res.json(movies);
  } catch (error) {
    console.error("Error Searching movie:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Get Movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔍 Requested Movie ID:", id);

    const movie = await movieService.getMovieById(id);

    if (!movie) {
      console.log("Movie not found:", id);
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
//creating a movie
exports.createMovie = async (req, res) => {
    try {
      const { title, overview, image, release_date, price, genre, rating } = req.body;
  
      if (!title || !overview || !image || !release_date || !price || !genre || !rating) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newMovie = await movieService.createMovie(req.body);
      res.status(201).json({ message: "Movie added successfully", movie: newMovie });
    } catch (error) {
      res.status(500).json({ message: "Error adding movie", error: error.message });
    }
  };
  exports.updateMovie = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedMovie = await movieService.updateMovie(id, req.body);
  
      if (!updatedMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }
  
      res.status(200).json({ message: "Movie updated successfully", movie: updatedMovie });
    } catch (error) {
      res.status(500).json({ message: "Error updating movie", error: error.message });
    }
  };
  //delete a movie 
  // In your movieController.js
exports.deleteMovie = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Deleting movie with ID:", id); // Log the ID for debugging
      const movie = await movieService.deleteMovieById(id);
  
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
  
      res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
      console.error("Error deleting movie:", error); // Log the complete error
      res.status(500).json({ message: "Error deleting movie", error: error.message });
    }
  };
  exports.createMovieCount = async (req, res) => {
    try {
      const totalMovies = await movieService.countMovies(); // ✅ Use service function
      res.status(200).json({ totalMovies });
    } catch (error) {
      console.error("❌ Error fetching movie count:", error);
      res.status(500).json({ message: "Error fetching movie count", error });
    }
  };