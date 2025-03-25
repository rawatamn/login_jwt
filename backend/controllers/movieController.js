import {countMovie, createMovies, deleteMovieByIds, getAllMovie, getMovieByIds, searchMovie, updateMovies} from "../services/movieService.js"
import Messages from "../utilities/message.js";
// ✅ Get All Movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await getAllMovie();
    res.json(movies);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: Messages.MOVIE.SERVER, error });
  }
};

// ✅ Search Movies by Title (Regex)
export const searchMovies = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: Messages.MOVIE.MOVIE_SEARCH_ERROR});
    }

    const movies = await searchMovie(query);

    if (movies.length === 0) {
      return res.status(404).json({ message: Messages.MOVIE.MOVIE_NOT_FOUND});
    }

    res.json(movies);
  } catch (error) {
    console.error("Error Searching movie:", error);
    res.status(500).json({ message: Messages.MOVIE.MOVIE_SEARCH_ERROR, error });
  }
};

// ✅ Get Movie by ID
export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
  

    const movie = await getMovieByIds(id);

    if (!movie) {
     
      return res.status(404).json({ message: Messages.MOVIE.MOVIE_NOT_FOUND});
    }

    res.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: Messages.MOVIE.MOVIE_FETCH_ERROR, error });
  }
};

// ✅ Create a Movie
export const createMovie = async (req, res) => {
  try {
    const { title, overview, image, release_date, price, genre, rating } = req.body;

    if (!title || !overview || !image || !release_date || !price || !genre || !rating) {
      return res.status(400).json({ message: Messages.MOVIE.REQIRE_FIELD});
    }

    const newMovie = await createMovies(req.body);
    res.status(201).json({ message: Messages.MOVIE.Movie_ADDED, movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: Messages.MOVIE.ERROR_MOVIE_ADD, error: error.message });
  }
};

// ✅ Update a Movie
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await updateMovies(id, req.body);

    if (!updatedMovie) {
      return res.status(404).json({ message:Messages.MOVIE.MOVIE_NOT_FOUND });
    }

    res.status(200).json({ message: Messages.MOVIE.MOVIE_UPDATE_SUCCESS, movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ message: Messages.MOVIE.MOVIE_UPDATE_ERROR, error: error.message });
  }
};

// ✅ Delete a Movie
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    
    const movie = await deleteMovieByIds(id);

    if (!movie) {
      return res.status(404).json({ message: Messages.MOVIE.MOVIE_NOT_FOUND });
    }

    res.status(200).json({ message: Messages.MOVIE.MOVIE_DELETE_SUCCESS });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: Messages.MOVIE.MOVIE_DELETE_ERROR, error: error.message });
  }
};

// ✅ Count Movies
export const createMovieCount = async (req, res) => {
  try {
    const totalMovies = await countMovie(); // ✅ Use service function
    res.status(200).json({ totalMovies });
  } catch (error) {
    console.error("❌ Error fetching movie count:", error);
    res.status(500).json({ message: Messages.MOVIE.MOVIE_COUNT_ERROR, error });
  }
};
