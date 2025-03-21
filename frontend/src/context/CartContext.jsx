import React, { createContext, useState, useEffect } from "react";
import { addMovieToCart, getCartData, removeMovieFromCart } from "../api/cartApi";
 // ✅ Import API functions

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Fetch Cart Data from Backend when component mounts
  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const cartData = await getCartData(userId); // ✅ Use centralized API function
      setCart(cartData);
    };

    fetchCart();
  }, []);

  // ✅ Add to Cart (Prevents duplicates)
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

    const userId = localStorage.getItem("userId");
    await addMovieToCart(userId, movie); // ✅ Use centralized API function
  };

  // ✅ Remove from Cart
  const removeFromCart = async (movieId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== movieId));

    const userId = localStorage.getItem("userId");
    await removeMovieFromCart(userId, movieId); // ✅ Use centralized API function
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
