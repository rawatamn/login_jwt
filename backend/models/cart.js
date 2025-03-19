const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ✅ Changed from ObjectId to String

  movies: [
    {
      movieId: { type: String, required: true }, // ✅ Changed from ObjectId to String
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
    },
  ],

  // ✅ Payment Status: "pending" by default, updates to "successful" after payment
  paymentStatus: {
    type: String,
    enum: ["pending", "successful"], // Only allow these values
    default: "pending", // ✅ Default to "pending"
  },

  createdAt: { type: Date, default: Date.now }, // ✅ Store when cart was created
});

const Cart = mongoose.model("Cart", CartSchema, "carts"); // ✅ Force collection name
module.exports = Cart;
