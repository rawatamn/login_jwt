import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/apiRoutes";
// 🔑 User Login API Call
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post(`${API.AUTH}${API.AUTH_LOGIN}`, credentials);
    return response.data;
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    throw error;
  }
};
// 🔑 User Signup API Call
export const registerUser = async (userData) => {
    try {
      const response = await axiosInstance.post(`${API.AUTH}${API.AUTH_REGISTER}`, {
        ...userData,
        role: "user", // Default role
      });
      return response.data;
    } catch (error) {
      console.error("❌ Signup failed:", error.response?.data || error.message);
      throw error;
    }
  };
