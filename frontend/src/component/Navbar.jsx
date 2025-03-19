import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSearch, FaShoppingCart, FaHistory, FaTimes, FaTrash } from "react-icons/fa";
import { CartContext } from "../context/CartContext"; // ✅ Import CartContext

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, setCart } = useContext(CartContext); // ✅ Get cart state

  // ✅ Fetch username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // ✅ Remove Movie from Cart
  const removeFromCart = (movieId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== movieId));
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md relative">
      
      {/* ✅ Logo (Click to go back to login) */}
      <span 
        className="text-3xl font-bold cursor-pointer"
        onClick={() => navigate("/login")} // ✅ Redirect to login page
      >
        book<span className="text-red-500">my</span>show
      </span>

      {/* ✅ Search Bar */}
      <div className="relative w-1/3">
        <div className="flex items-center bg-gray-200 px-3 py-2 rounded-lg w-full">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for Movies..."
            className="bg-transparent outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ✅ User Info + Cart + Order History */}
      <div className="flex items-center space-x-6">
        
        {/* ✅ Order History Icon */}
        <div className="relative cursor-pointer" onClick={() => navigate("/orders")}>
          <FaHistory className="text-gray-700 text-2xl" title="Order History" />
        </div>

        {/* ✅ Cart Icon with Popup Trigger */}
        <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
          <FaShoppingCart className="text-gray-700 text-2xl" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </div>

        {/* ✅ Logout or Sign In */}
        {username ? (
          <div className="flex items-center space-x-3">
            <FaUser className="text-gray-700" />
            <span className="font-medium">Hey, {username}</span>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                navigate("/login");
              }}
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Sign In
          </button>
        )}
      </div>

      {/* ✅ Cart Popup */}
      {isCartOpen && (
        <div className="absolute top-16 right-6 bg-white shadow-lg p-4 rounded-lg w-80 z-20">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <FaTimes className="cursor-pointer" onClick={() => setIsCartOpen(false)} />
          </div>

          {cart.length > 0 ? (
            <div className="max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between items-center p-2 border-b">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="font-bold">₹{item.price * item.quantity}</p>
                    <FaTrash 
                      className="text-red-500 cursor-pointer"
                      onClick={() => removeFromCart(item._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}

          {/* ✅ "Proceed to Payment" Button */}
          {cart.length > 0 && (
            <button
              className="bg-green-500 text-white w-full py-2 mt-4 rounded-lg font-bold"
              onClick={() => navigate("/payment", { state: { cart } })} // ✅ Pass cart data
            >
              Proceed to Payment
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
