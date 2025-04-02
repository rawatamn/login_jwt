import axiosInstance from "../utils/axiosInstance"; // Use centralized axios instance
import { API } from "../utils/apiRoutes";
// Fetch a movie by ID
export const fetchMovieById = async (movieId) => {
  try {
    const response = await axiosInstance.get(`${API.MOVIES}/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(" Error fetching movie:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch movie");
  }
};
export const fetchMovies = async () => {
    try {
      const response = await axiosInstance.get(API.MOVIES);
      return response.data;
    } catch (error) {
      console.error(" Error fetching movies:", error);
      throw new Error(error.response?.data?.message || "Failed to fetch movies");
    }
  };

