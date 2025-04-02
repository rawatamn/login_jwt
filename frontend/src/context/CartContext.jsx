import React, { createContext, useState, useEffect } from "react";
import { addMovieToCart, getCartData, removeMovieFromCart } from "../api/cartApi"; // Import API functions
import { localStorageUtils } from "../utils/localStorageUtils"; // Import LocalStorage Utility
import { LocalStorageKeys } from "../constants/enums"; // Import LocalStorage Enums

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fetch Cart Data from Backend when component mounts
  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorageUtils.getItem(LocalStorageKeys.USER_ID);
      if (!userId) return;

      try {
        const cartData = await getCartData(userId); // Fetch cart from API
        setCart(cartData);
      } catch (error) {
        console.error(" Error fetching cart:", error.response?.data || error.message);
      }
    };

    fetchCart();
  }, []);

  // Add to Cart (Prevents duplicates)
  const addToCart = async (movie) => {
    setCart((prevCart) => {
      const existingMovie = prevCart.find((item) => item._id === movie._id);
      if (existingMovie) {
        return prevCart.map((item) =>
          item._id === movie._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...movie, quantity: 1 }];
    });

    try {
      const userId = localStorageUtils.getItem(LocalStorageKeys.USER_ID);
      if (userId) await addMovieToCart(userId, movie); // Use API function
    } catch (error) {
      console.error(" Error adding to cart:", error.response?.data || error.message);
    }
  };

  // Remove from Cart
  const removeFromCart = async (movieId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== movieId));

    try {
      const userId = localStorageUtils.getItem(LocalStorageKeys.USER_ID);
      if (userId) await removeMovieFromCart(userId, movieId); // Use API function
    } catch (error) {
      console.error(" Error removing from cart:", error.response?.data || error.message);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
