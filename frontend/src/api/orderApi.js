import axiosInstance from "../utils/axiosInstance"; // ✅ Use centralized axios instance
import { API } from "../utils/apiRoutes";
// ✅ Fetch user orders
export const fetchUserOrders = async (userId) => {
  try {
    const response = await axiosInstance.get(`${API.CART}${API.CART_ORDERS}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return [];
  }
};
