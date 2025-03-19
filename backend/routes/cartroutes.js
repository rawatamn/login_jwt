const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

// ✅ Add Movie to Cart
router.post("/", async (req, res) => {
  try {
    console.log("Incoming Request:", req.body);

    const { userId, movieId, title, price, quantity } = req.body;

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
        paymentStatus: "pending", // ✅ Default payment status
      });
    }

    await cart.save();
    console.log("Cart Updated:", cart);

    res.status(200).json({ message: "Movie added to cart", cart });
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});



// ✅ Update Movie Quantity in Cart
router.patch("/update/:userId/:movieId", async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const { quantity, pricePerTicket } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const movie = cart.movies.find((item) => item.movieId === movieId);
    if (!movie) return res.status(404).json({ message: "Movie not in cart" });

    movie.quantity = quantity;
    movie.price = quantity * pricePerTicket;

    await cart.save();
    res.json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.error("❌ Error updating cart:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Get Cart Items for a User
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart is empty" });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Remove Movie from Cart
router.delete("/:userId/:movieId", async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { movies: { movieId } } },
      { new: true }
    );

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.json({ message: "Movie removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});
// ✅ Confirm Payment Route
router.post("/confirm-payment", async (req, res) => {
  try {
    console.log("✅ Confirming payment...");
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // ✅ Mark Payment as Successful
    cart.paymentStatus = "successful";
    await cart.save();

    res.status(200).json({ message: "Payment confirmed successfully", cart });
  } catch (error) {
    console.error("❌ Error confirming payment:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});
router.get("/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orders = await Cart.find({ userId, paymentStatus: "successful" });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});



module.exports = router;
