import axiosInstance from "../utils/axiosInstance";

// ✅ Fetch Cart Data
export const getCartData = async (userId) => {
  if (!userId) return [];
  try {
    const response = await axiosInstance.get(`/api/cart/${userId}`);
    return response.data?.movies || [];
  } catch (error) {
    console.error("❌ Error fetching cart:", error.response?.data || error.message);
    return [];
  }
};

// ✅ Add Movie to Cart
export const addMovieToCart = async (userId, movie) => {
  if (!userId) return;
  try {
    await axiosInstance.post("/api/cart", {
      userId,
      movieId: movie._id,
      title: movie.title,
      price: movie.price,
      quantity: 1,
    });
  } catch (error) {
    console.error("❌ Error adding to cart:", error.response?.data || error.message);
  }
};

// ✅ Remove Movie from Cart
export const removeMovieFromCart = async (userId, movieId) => {
  if (!userId) return;
  try {
    await axiosInstance.delete(`/api/cart/${userId}/${movieId}`);
  } catch (error) {
    console.error("❌ Error removing from cart:", error.response?.data || error.message);
  }
};
