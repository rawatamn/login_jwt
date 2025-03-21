import axiosInstance from "../utils/axiosInstance";

// 🎬 Fetch All Movies
export const fetchMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching movies:", error.response?.data || error.message);
    throw error;
  }
};

// 🗑️ Delete a Movie
export const deleteMovie = async (movieId) => {
  try {
    const response = await axiosInstance.delete(`/api/movies/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting movie:", error.response?.data || error.message);
    throw error;
  }
};

// ✏️ Update a Movie
export const updateMovie = async (movieId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/api/movies/${movieId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating movie:", error.response?.data || error.message);
    throw error;
  }
};

// ➕ Add a New Movie
export const addMovie = async (movieData) => {
  try {
    const response = await axiosInstance.post("/api/movies", movieData);
    return response.data;
  } catch (error) {
    console.error("❌ Error adding movie:", error.response?.data || error.message);
    throw error;
  }
};
