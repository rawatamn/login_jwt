import axiosInstance from "../utils/axiosInstance"; // ✅ Use Axios instance

// ✅ Initiate Payment
export const initiatePayment = async (userId) => {
  try {
    const response = await axiosInstance.post("/api/cart/initiate-payment", { userId });
    return response.data.cart.paymentStatus;
  } catch (error) {
    console.error("❌ Error initiating payment:", error);
    throw new Error(error.response?.data?.message || "Failed to initiate payment");
  }
};

// ✅ Confirm Payment
export const confirmPayment = async (userId) => {
  try {
    await axiosInstance.post("/api/cart/confirm-payment", { userId });
    return "Payment Successful! 🎉";
  } catch (error) {
    console.error("❌ Error confirming payment:", error);
    throw new Error(error.response?.data?.message || "Payment Failed. Please try again.");
  }
};
