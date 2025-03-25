import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/apiRoutes";
// ✅ Fetch logged-in user details
export const fetchUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in.");

    const response = await axiosInstance.get(`${API.USERS}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

   
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch user data:", error.response?.data || error.message);
    throw error;
  }
};
export const getUserData = async (token) => {
    try {
      const response = await axiosInstance.get(`${API.USERS}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching user data:", error.response?.data || error.message);
      throw error;
    }
  };
  
  // ✅ Search movies by query
  export const searchMovies = async (query) => {
    try {
      const response = await axiosInstance.get(`${API.MOVIES}${API.MOVIE_SEARCH}?q=${query}`);
      return response.data;
    } catch (error) {
      console.error("❌ Error searching movies:", error);
      return [];
    }
  };