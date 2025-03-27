import axiosInstance from "../utils/axiosInstance"; // ✅ Use centralized Axios instance
import { API } from "../utils/apiRoutes";
// ✅ Fetch User Count
export const fetchUserCount = async () => {
  try {
    const response = await axiosInstance.get(`${API.USERS}${API.USER_COUNT}`);
    return response.data.totalUsers;
  } catch (error) {
    console.error("❌ Error fetching user count:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch user count");
  }
};

// ✅ Fetch Movie Count
export const fetchMovieCount = async () => {
  try {
    const response = await axiosInstance.get(`${API.MOVIES}${API.MOVIE_COUNT}`);
    return response.data.totalMovies;
  } catch (error) {
    console.error("❌ Error fetching movie count:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch movie count");
  }
};

// ✅ Fetch Total Revenue
export const fetchTotalRevenue = async () => {
  try {
    const response = await axiosInstance.get(`${API.USERS}${API.TOTAL_REVENUE}`);
    return response.data.totalRevenue;
  } catch (error) {
    console.error("❌ Error fetching total revenue:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch total revenue");
  }
};

export const fetchUserRevenue = async () => {
  try {
    const response = await axiosInstance.get(`${API.USERS}${API.USER_REVENUE}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user revenue data:", error);
    return [];
  }
};

