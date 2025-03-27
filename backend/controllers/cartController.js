import * as cartService from "../services/cartService.js"
import Messages from "../utilities/message.js";

// ✅ Add Movie to Cart
export const addToCart = async (req, res) => {
  try {
    const { userId, movieId, title, price, quantity } = req.body;
    const cart = await cartService.addMovieToCart(userId, movieId, title, price, quantity);
    res.status(200).json({ message: Messages.CART.ADDED, cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Initiate Payment
export const initiatePayment = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await cartService.initiatePayment(userId);
    res.status(200).json({ message: Messages.PAYMENT.INITIATED, cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Movie Quantity in Cart
export const updateCart = async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const { quantity, pricePerTicket } = req.body;

    const cart = await cartService.updateCartItem(userId, movieId, quantity, pricePerTicket);
    res.json({ message: Messages.CART.UPDATED, cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Cart Items
export const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCartByUserId(req.params.userId);
    if (!cart) return res.status(404).json({ message: Messages.CART.EMPTY });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Remove Movie from Cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const cart = await cartService.removeMovieFromCart(userId, movieId);
    res.json({ message: Messages.CART.REMOVED, cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Confirm Payment
export const confirmPayment = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("💳 Confirming payment for user:", userId); // Debug log

    const order = await cartService.confirmPayment(userId);

    console.log("✅ Payment confirmed, order created:", JSON.stringify(order, null, 2));

    res.status(200).json({ message: Messages.PAYMENT.CONFIRMED, order });
  } catch (error) {
    console.error("❌ Error in confirmPayment:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Successful Orders
export const getOrders = async (req, res) => {
  try {
    console.log("🛠️ Fetching orders for user:", req.params.userId);

    const orders = await cartService.getSuccessfulOrders(req.params.userId);

    console.log("✅ Orders fetched from DB:", JSON.stringify(orders, null, 2));

    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error.message);
    res.status(500).json({ message: error.message });
  }
};

