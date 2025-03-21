import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { confirmPayment, initiatePayment } from "../api/paymentApi";


const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCart } = useContext(CartContext);
  const cart = location.state?.cart || [];
  const [paymentStatus, setPaymentStatus] = useState("pending");

  // ✅ Calculate Total Price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ✅ Initiate Payment on Page Load
  useEffect(() => {
    const loadPaymentStatus = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const status = await initiatePayment(userId); // ✅ Use centralized API
        setPaymentStatus(status);
      } catch (error) {
        console.error(error);
      }
    };

    loadPaymentStatus();
  }, []);

  // ✅ Handle Payment Completion
  const handlePayment = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await confirmPayment(userId); // ✅ Use centralized API
      alert("Payment Successful! 🎉");

      // ✅ Clear Cart after Payment
      setCart([]);
      localStorage.removeItem("cart");

      // ✅ Redirect to Dashboard
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Payment Summary</h2>

      {cart.length > 0 ? (
        <ul className="mb-4">
          {cart.map((item) => (
            <li key={item._id} className="flex justify-between py-2 border-b">
              <span>{item.title} (x{item.quantity})</span>
              <span className="font-bold">₹{item.price * item.quantity}</span>
            </li>
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
      <button
        className="bg-blue-500 text-white w-full py-2 mt-4 rounded-lg font-bold"
        onClick={handlePayment}
        disabled={paymentStatus === "successful"}
      >
        {paymentStatus === "successful" ? "Payment Completed" : "Confirm Payment"}
      </button>
    </div>
  );
};

export default Payment;
