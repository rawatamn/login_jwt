import axiosInstance from "../utils/axiosInstance"; // Use centralized axios instance
import { API } from "../utils/apiRoutes";
export const fetchUserOrders = async (userId) => {
  try {
      const apiUrl = `${API.CART}/orders/${userId}`;
      console.log("🔗 API URL:", apiUrl);
      
      console.log("📡 Fetching orders for user:", userId);
      const response = await axiosInstance.get(apiUrl);
      
      console.log("Fetched Orders:", response.data);
      return response.data;
  } catch (error) {
      console.error(" API Error:", error.response?.data || error.message);
      return [];
  }
};
