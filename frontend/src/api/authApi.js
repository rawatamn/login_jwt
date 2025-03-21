import axiosInstance from "../utils/axiosInstance";

// 🔑 User Login API Call
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post(`/api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    throw error;
  }
};
// 🔑 User Signup API Call
export const registerUser = async (userData) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", {
        ...userData,
        role: "user", // Default role
      });
      return response.data;
    } catch (error) {
      console.error("❌ Signup failed:", error.response?.data || error.message);
      throw error;
    }
  };
