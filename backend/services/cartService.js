import Cart from "../models/cart.js";
import Order from "../models/Order.js";
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
      
      // ✅ Ensure cart remains in "pending" status until payment is confirmed
      cart.paymentStatus = "pending";
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

    // ✅ Ensure the cart has movies before changing status
    if (!cart.movies || cart.movies.length === 0) {
        console.error("❌ Cannot initiate payment. Cart is empty!");
        throw new Error("Cannot initiate payment. No movies in the cart.");
    }

    // ✅ If payment was already successful, reset to pending without clearing movies
    if (cart.paymentStatus === "successful") {
        cart.paymentStatus = "pending";
        await cart.save();
    }

    console.log("✅ Payment Initiation Successful, Cart:", JSON.stringify(cart, null, 2));

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
  
  export const confirmPayment = async (userId) => {
    try {
        console.log("🛠️ Confirming payment for user:", userId);

        // ✅ Fetch the cart for the user
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            console.error("❌ Cart not found for user:", userId);
            throw new Error(Messages.CART.NOT_FOUND);
        }

        if (!cart.movies || cart.movies.length === 0) {
            console.error("❌ No movies in cart for user:", userId);
            throw new Error("No movies in cart to order");
        }

        console.log("✅ Cart before order creation:", JSON.stringify(cart, null, 2));

        // ✅ Prepare order data
        const moviesToOrder = cart.movies.map(movie => ({
            movieId: movie.movieId,
            title: movie.title,
            price: movie.price,
            quantity: movie.quantity,
        }));

        const totalPrice = cart.movies.reduce((sum, movie) => sum + (movie.price * movie.quantity), 0);

        // ✅ Create new order
        const newOrder = new Order({
            userId: cart.userId,
            movies: moviesToOrder,
            totalPrice,
            paymentStatus: "successful",
        });

        // ✅ Save the order
        const savedOrder = await newOrder.save();
        if (!savedOrder) {
            console.error("❌ Order save failed, cart will NOT be deleted");
            throw new Error("Order save failed");
        }

        console.log("✅ Order saved successfully:", JSON.stringify(savedOrder, null, 2));

        // ✅ Fetch the order back from DB to verify movies were saved
        const savedOrderWithMovies = await Order.findById(savedOrder._id);
        console.log("📦 Order fetched from DB after saving:", JSON.stringify(savedOrderWithMovies, null, 2));

        // ✅ Update the cart's paymentStatus to "successful" before deleting it
        const cartUpdateResult = await Cart.updateOne({ userId }, { $set: { paymentStatus: "successful" } });
        if (cartUpdateResult.modifiedCount === 0) {
            console.warn("⚠️ Cart payment status was not updated, check for issues.");
        } else {
            console.log("✅ Cart payment status updated to 'successful'");
        }

        // ✅ Delete Cart After Ensuring Order is Saved
        const deletedCart = await Cart.findOneAndDelete({ userId });
        if (deletedCart) {
            console.log("🗑️ Cart deleted after successful order");
        } else {
            console.warn("⚠️ Cart was not found or already deleted");
        }

        return savedOrder;
    } catch (error) {
        console.error("❌ Error in confirmPayment:", error.message);
        throw new Error(error.message || "Error confirming payment");
    }
};



export const getSuccessfulOrders = async (userId) => {
  console.log("🔍 Fetching orders for user:", userId);

  const orders = await Order.find({ userId, paymentStatus: "successful" });

  console.log("✅ Orders fetched from DB:", JSON.stringify(orders, null, 2));

  if (!orders.length) {
    console.warn("⚠️ No successful orders found for user:", userId);
    return [];
  }

  return orders;
};
