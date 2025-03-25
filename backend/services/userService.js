import User from "../models/user.js";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import Cart from "../models/cart.js";
import Messages from "../utilities/message.js";
// ✅ Fetch logged-in user
export const getLoggedInUsers = async (userId) => {
  return await User.findById(userId).select("-password");
};

// ✅ Fetch all users (excluding superadmins)
export const getAllUser = async () => {
  return await User.find({ role: { $ne: "superadmin" } }).select("-password");
};

// ✅ Create a new user
export const createUsers = async (userData, createdBy) => {
  const { username, useremail, password, role } = userData;

  // Check if email already exists
  const existingUsers = await User.findOne({ useremail });
  if (existingUsers) {
    throw new Error(Messages.USER.EMAIL_EXISTS);
  }

  // Create new user with Nano ID
  const newUsers = new User({
    _id: nanoid(10),
    username,
    useremail,
    password, // NOTE: Hash password before saving in production!
    role,
    updatedBy: createdBy,
  });

  return await newUsers.save();
};

// ✅ Update an existing user
export const updateUsers = async (userId, updateData, updatedBy) => {
  try {
    console.log("🔹 Updating User:", userId);
    console.log("🔹 Update Data:", updateData);
    console.log("🔹 Updated By:", updatedBy);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("❌ Invalid user ID format:", userId);
      return { error: Messages.VALIDATION.INVALID_INPUT };
    }

    if (updateData.useremail) {
      const existingUser = await User.findOne({ useremail: updateData.useremail });
      if (existingUser && existingUser._id.toString() !== userId) {
        console.log("❌ Email already exists:", updateData.useremail);
        return { error: Messages.USER.EMAIL_EXISTS};
      }
    }

    const updatedUsers = await User.findByIdAndUpdate(
      userId,
      {
        ...updateData,
        updatedBy: updatedBy ? updatedBy : null,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedUsers) {
      console.log("❌ User not found with ID:", userId);
      return { error: Messages.USER.Not_Found };
    }

    console.log("✅ Updated User Successfully:", updatedUsers);
    return {
      ...updatedUsers.toObject(),
      createdAt: updatedUsers.createdAt.getTime(),
      updatedAt: updatedUsers.updatedAt.getTime(),
    };

  } catch (error) {
    console.error("❌ Error in updateUser service:", error);
    return { error: Messages.ERROR.UNKNOWN_ERROR};
  }
};

// ✅ Delete a user
export const deleteUsers = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId) && userId.length !== 10) {
    throw new Error(Messages.VALIDATION.INVALID_INPUT);
  }
  return await User.findByIdAndDelete(userId);
};

// ✅ Count total users
export const countUser = async () => {
  return await User.countDocuments();
};

// ✅ Calculate total revenue
export const calculateTotalRevenues = async () => {
  try {
    console.log("🔹 Fetching successful orders...");

    // Fetch orders with successful payments
    const successfulOrders = await Cart.find({ paymentStatus: "successful" });

    console.log("✅ Successful Orders:", successfulOrders.length);

    if (!successfulOrders || successfulOrders.length === 0) {
      console.log("⚠️ No successful orders found.");
      return 0;
    }

    // Calculate total revenue
    const totalRevenue = successfulOrders.reduce((total, order) => {
      console.log("🛒 Processing Order:", order);
      const orderTotal = order.movies.reduce((sum, movie) => {
        return sum + (movie.price * movie.quantity);
      }, 0);

      return total + orderTotal;
    }, 0);

    console.log("💰 Total Revenue Calculated:", totalRevenue);
    return totalRevenue;

  } catch (error) {
    console.error("❌ Error in calculateTotalRevenue:", error);
    throw new Error(error.message || Messages.Revenue.Total_Revenue);
  }
};
