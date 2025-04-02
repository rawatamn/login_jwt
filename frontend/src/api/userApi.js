import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/apiRoutes";
import { localStorageUtils } from "../utils/localStorageUtils"; // Import local storage utils
import { LocalStorageKeys } from "../constants/enums"; // Import enums

// Fetch logged-in user details
export const fetchUser = async () => {
  try {
    const token = localStorageUtils.getItem(LocalStorageKeys.TOKEN);
    if (!token) throw new Error("No token found. Please log in.");

    const response = await axiosInstance.get(`${API.USERS}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error(" Failed to fetch user data:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch user data with token (used externally)
export const getUserData = async (token) => {
  try {
    if (!token) throw new Error("Token is required to fetch user data.");

    const response = await axiosInstance.get(`${API.USERS}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error(" Error fetching user data:", error.response?.data || error.message);
    throw error;
  }
};

// Search movies by query
export const searchMovies = async (query) => {
  try {
    if (!query.trim()) return [];

    const response = await axiosInstance.get(`${API.MOVIES}${API.MOVIE_SEARCH}?q=${query}`);
    return response.data;
  } catch (error) {
    console.error(" Error searching movies:", error.response?.data || error.message);
    return [];
  }
};
