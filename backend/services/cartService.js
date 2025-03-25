import Cart from "../models/cart.js";
import Messages from "../utilities/message.js";

export const addMovieToCart = async (userId, movieId, title, price, quantity) => {
    let cart = await Cart.findOne({ userId });
  
    if (cart) {
      const existingMovie = cart.movies.find((item) => item.movieId === movieId);
      if (existingMovie) {
        existingMovie.quantity += 1;
      } else {
        cart.movies.push({ movieId, title, price, quantity });
      }
    } else {
      cart = new Cart({
        userId,
        movies: [{ movieId, title, price, quantity }],
        paymentStatus: "pending",
      });
    }
  
    await cart.save();
    return cart;
  };
  
  // ✅ Initiate Payment
  export const initiatePayment = async (userId) => {
    if (!userId) throw new Error(Messages.AUTH.USER_ID_REQUIRED);
  
    let cart = await Cart.findOne({ userId });
    if (!cart) throw new Error(Messages.CART.NOT_FOUND);
  
    if (cart.paymentStatus === "successful") {
      cart.paymentStatus = "pending";
      await cart.save();
    }
  
    return cart;
  };
  
  // ✅ Update Movie Quantity in Cart
  export const updateCartItem = async (userId, movieId, quantity, pricePerTicket) => {
    if (quantity < 1) throw new Error(Messages.CART.MIN_QUANTITY);
  
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error(Messages.CART.NOT_FOUND);
  
    const movie = cart.movies.find((item) => item.movieId === movieId);
    if (!movie) throw new Error(Messages.CART.MOVIE_NOT_IN_CART);
  
    movie.quantity = quantity;
    movie.price = quantity * pricePerTicket;
  
    await cart.save();
    return cart;
  };
  
  // ✅ Get Cart by User ID
  export const getCartByUserId = async (userId) => {
    return await Cart.findOne({ userId }) || null;
  };
  
  // ✅ Remove Movie from Cart
  export const removeMovieFromCart = async (userId, movieId) => {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { movies: { movieId } } },
      { new: true }
    );
  
    if (!cart) throw new Error(Messages.CART.NOT_FOUND);
    return cart;
  };
  
  // ✅ Confirm Payment
  export const confirmPayment = async (userId) => {
    let cart = await Cart.findOne({ userId });
    if (!cart) throw new Error(Messages.CART.NOT_FOUND);
  
    cart.paymentStatus = "successful";
    await cart.save();
  
    return cart;
  };
  
  // ✅ Fetch Successful Orders
  export const getSuccessfulOrders = async (userId) => {
    return await Cart.find({ userId, paymentStatus: "successful" });
  };