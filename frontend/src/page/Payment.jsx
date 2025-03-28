import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { confirmPayment, initiatePayment } from "../api/paymentApi";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCart } = useContext(CartContext);
  const cart = location.state?.cart || [];
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  // ✅ Calculate Total Price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ✅ Initiate Payment on Page Load
  useEffect(() => {
    const loadPaymentStatus = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const status = await initiatePayment(userId);
        setPaymentStatus(status);
      } catch (error) {
        toast.error("❌ Payment initiation failed!");
      }
    };

    loadPaymentStatus();
  }, []);

  // ✅ Handle Payment Completion
  const handlePayment = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      await confirmPayment(userId);

      toast.success("✅ Payment Successful! 🎉");

      // ✅ Clear Cart after Payment
      setCart([]);
      localStorage.removeItem("cart");

      // ✅ Redirect to Dashboard after 2 seconds
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      toast.error(error.message || "❌ Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg"
    >
      <ToastContainer position="top-right" autoClose={2000} />

      <h2 className="text-2xl font-bold mb-4 text-center">💳 Payment Summary</h2>

      {cart.length > 0 ? (
        <ul className="mb-4">
          {cart.map((item) => (
            <motion.li
              key={item._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between py-2 border-b"
            >
              <span>{item.title} (x{item.quantity})</span>
              <span className="font-bold">₹{item.price * item.quantity}</span>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty</p>
      )}

      {/* ✅ Show Payment Status */}
      <div className="text-lg font-semibold mt-4 flex justify-between">
        <span>Status:</span>
        <span className={`font-bold ${paymentStatus === "successful" ? "text-green-600" : "text-yellow-600"}`}>
          {paymentStatus.toUpperCase()}
        </span>
      </div>

      {/* ✅ Total Price */}
      <div className="text-lg font-semibold mt-4 flex justify-between">
        <span>Total:</span>
        <span>₹{totalPrice}</span>
      </div>

      {/* ✅ Proceed Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-500 text-white w-full py-2 mt-4 rounded-lg font-bold"
        onClick={handlePayment}
        disabled={paymentStatus === "successful" || loading}
      >
        {loading ? "Processing..." : paymentStatus === "successful" ? "Payment Completed" : "Confirm Payment"}
      </motion.button>
    </motion.div>
  );
};

export default Payment;
