import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Fetch Cart Data from Backend when component mounts
  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:7000/api/cart/${userId}`);
        setCart(response.data?.movies || []);
      } catch (error) {
        console.error("❌ Error fetching cart:", error);
      }
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

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      await axios.post("http://localhost:7000/api/cart", {
        userId,
        movieId: movie._id,
        title: movie.title,
        price: movie.price,
        quantity: 1,
      });
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
    }
  };

  // ✅ Remove from Cart
  const removeFromCart = async (movieId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== movieId));

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      await axios.delete(`http://localhost:7000/api/cart/${userId}/${movieId}`);
    } catch (error) {
      console.error("❌ Error removing from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
