const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");

// ✅ Generate a default `userId` (10-character alphanumeric)
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 10);

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      default: () => nanoid(), // ✅ Auto-generate unique userId
    },
    username: {
      type: String,
      required: true,
    },
    useremail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "superadmin"],
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ Reference to Superadmin who last updated
      default: null,
    },
  },
  {
    timestamps: true, // ✅ Auto-generates createdAt & updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);
