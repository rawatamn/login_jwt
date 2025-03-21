import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../api/orderApi";


const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login");
        return;
      }
      const data = await fetchUserOrders(userId);
      setOrders(data);
      setLoading(false);
    };

    loadOrders();
  }, [navigate]);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">🎟️ Your Booked Tickets</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg mb-4 shadow-sm">
              <h3 className="text-lg font-semibold">🆔 Order ID: {order._id}</h3>
              <p className="text-gray-600">📅 Booking Date: {new Date(order.createdAt).toLocaleString()}</p>

              <ul className="mt-2">
                {order.movies.map((movie) => (
                  <li key={movie.movieId} className="flex justify-between py-2 border-b">
                    <span>{movie.title} (x{movie.quantity})</span>
                    <span className="font-bold">₹{movie.price * movie.quantity}</span>
                  </li>
                ))}
              </ul>

              <div className="text-lg font-semibold mt-3 flex justify-between">
                <span>Total Price:</span>
                <span>₹{order.movies.reduce((sum, movie) => sum + movie.price * movie.quantity, 0)}</span>
              </div>

              <div className="mt-2">
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  order.paymentStatus === "successful" ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                }`}>
                  {order.paymentStatus.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No previous orders found.</p>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition"
        >
          🔙 Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Orders;
