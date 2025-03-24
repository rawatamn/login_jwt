import {countMovie, createMovies, deleteMovieByIds, getAllMovie, getMovieByIds, searchMovie, updateMovies} from "../services/movieService.js"

// ✅ Get All Movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await getAllMovie();
    res.json(movies);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Search Movies by Title (Regex)
export const searchMovies = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const movies = await searchMovie(query);

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
export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔍 Requested Movie ID:", id);

    const movie = await getMovieByIds(id);

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

// ✅ Create a Movie
export const createMovie = async (req, res) => {
  try {
    const { title, overview, image, release_date, price, genre, rating } = req.body;

    if (!title || !overview || !image || !release_date || !price || !genre || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMovie = await createMovies(req.body);
    res.status(201).json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: "Error adding movie", error: error.message });
  }
};

// ✅ Update a Movie
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await updateMovies(id, req.body);

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error: error.message });
  }
};

// ✅ Delete a Movie
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting movie with ID:", id); // Log the ID for debugging
    const movie = await deleteMovieByIds(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: "Error deleting movie", error: error.message });
  }
};

// ✅ Count Movies
export const createMovieCount = async (req, res) => {
  try {
    const totalMovies = await countMovie(); // ✅ Use service function
    res.status(200).json({ totalMovies });
  } catch (error) {
    console.error("❌ Error fetching movie count:", error);
    res.status(500).json({ message: "Error fetching movie count", error });
  }
};
