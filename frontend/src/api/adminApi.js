import axiosInstance from "../utils/axiosInstance"; // ✅ Use centralized Axios instance

// ✅ Fetch User Count
export const fetchUserCount = async () => {
  try {
    const response = await axiosInstance.get("/api/users/count");
    return response.data.totalUsers;
  } catch (error) {
    console.error("❌ Error fetching user count:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch user count");
  }
};

// ✅ Fetch Movie Count
export const fetchMovieCount = async () => {
  try {
    const response = await axiosInstance.get("/api/movies/moviecount");
    return response.data.totalMovies;
  } catch (error) {
    console.error("❌ Error fetching movie count:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch movie count");
  }
};

// ✅ Fetch Total Revenue
export const fetchTotalRevenue = async () => {
  try {
    const response = await axiosInstance.get("/api/users/total-revenue");
    return response.data.totalRevenue;
  } catch (error) {
    console.error("❌ Error fetching total revenue:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch total revenue");
  }
};
