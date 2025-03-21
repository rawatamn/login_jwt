import axiosInstance from "../utils/axiosInstance"; // ✅ Use centralized axios instance

// ✅ Fetch user orders
export const fetchUserOrders = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/cart/orders/${userId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return [];
  }
};
