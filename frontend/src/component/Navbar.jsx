import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSearch, FaShoppingCart, FaHistory, FaTimes, FaTrash } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { searchMovies } from "../api/userApi";
import { localStorageUtils } from "../utils/localStorageUtils"; 
import { LocalStorageKeys } from "../constants/enums"; 
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, removeFromCart } = useContext(CartContext);

  // Fetch username from LocalStorage
  useEffect(() => {
    const storedUsername = localStorageUtils.getItem(LocalStorageKeys.USERNAME);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Fetch Movies based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const movies = await searchMovies(searchQuery);
        setFilteredMovies(movies);
      } catch (error) {
        toast.error(" Error searching movies!");
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchMovies, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle Movie Selection (Redirect)
  const handleMovieSelect = (movieId) => {
    setSearchQuery("");
    setFilteredMovies([]);
    navigate(`/movies/${movieId}`);
  };

  // Handle Logout
  const handleLogout = () => {
    toast.success("Logged out successfully!", {
      onClose: () => {
        localStorageUtils.clearStorage();
        navigate("/login");
      },
    });
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md relative">
      <ToastContainer position="top-right" autoClose={2000} />
      
      {/* Logo */}
      <motion.span
        whileHover={{ scale: 1.1 }}
        className="text-3xl font-bold cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        book<span className="text-red-500">my</span>show
      </motion.span>

      {/* Search Bar */}
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

        {/* Search Suggestions Dropdown */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute w-full bg-white shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto z-10"
          >
            {loading ? (
              <p className="p-3 text-gray-500">Loading...</p>
            ) : filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <div
                  key={movie._id}
                  className="p-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleMovieSelect(movie._id)}
                >
                  {movie.title}
                </div>
              ))
            ) : (
              <p className="p-3 text-gray-500">No movies found</p>
            )}
          </motion.div>
        )}
      </div>

      {/* User Info + Cart + Order History */}
      <div className="flex items-center space-x-6">
        {/* Order History Icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative cursor-pointer"
          onClick={() => navigate("/orders")}
        >
          <FaHistory className="text-gray-700 text-2xl" title="Order History" />
        </motion.div>

        {/* Cart Icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative cursor-pointer"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <FaShoppingCart className="text-gray-700 text-2xl" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </motion.div>

        {/* Logout or Sign In */}
        {username ? (
          <div className="flex items-center space-x-3">
            <span className="font-medium">Hey, {username}</span>
            <button
              onClick={handleLogout}
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

      {/* Cart Popup */}
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-16 right-6 bg-white shadow-lg p-4 rounded-lg w-80 z-20"
        >
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
                      onClick={() => {
                        removeFromCart(item._id);
                        toast.info("Item removed from cart 🛒");
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}

          {/* "Proceed to Payment" Button */}
          {cart.length > 0 && (
            <button
              className="bg-green-500 text-white w-full py-2 mt-4 rounded-lg font-bold"
              onClick={() => navigate("/payment", { state: { cart } })}
            >
              Proceed to Payment
            </button>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
