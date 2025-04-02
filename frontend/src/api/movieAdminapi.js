import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/apiRoutes";
// 🎬 Fetch All Movies
export const fetchMovies = async () => {
  try {
    const response = await axiosInstance.get(API.MOVIES);
    return response.data;
  } catch (error) {
    console.error(" Error fetching movies:", error.response?.data || error.message);
    throw error;
  }
};

// 🗑️ Delete a Movie
export const deleteMovie = async (movieId) => {
  try {
    const response = await axiosInstance.delete(`${API.MOVIES}/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(" Error deleting movie:", error.response?.data || error.message);
    throw error;
  }
};

// ✏️ Update a Movie
export const updateMovie = async (movieId, updatedData) => {
  try {
    const response = await axiosInstance.put(`${API.MOVIES}/${movieId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(" Error updating movie:", error.response?.data || error.message);
    throw error;
  }
};

// ➕ Add a New Movie
export const addMovie = async (movieData) => {
  try {
    const response = await axiosInstance.post(API.MOVIES, movieData);
    return response.data;
  } catch (error) {
    console.error(" Error adding movie:", error.response?.data || error.message);
    throw error;
  }
};
