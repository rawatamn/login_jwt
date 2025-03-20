const User = require("../models/user");
const mongoose = require("mongoose");
const moment = require("moment");
const { nanoid } = require("nanoid");
const Cart=require("../models/cart")
// ✅ Fetch logged-in user
exports.getLoggedInUser = async (userId) => {
  return await User.findById(userId).select("-password");
};

// ✅ Fetch all users (excluding superadmins)
exports.getAllUsers = async () => {
  return await User.find({ role: { $ne: "superadmin" } }).select("-password");
};

// ✅ Create a new user
exports.createUser = async (userData, createdBy) => {
  const { username, useremail, password, role } = userData;

  // Check if email already exists
  const existingUser = await User.findOne({ useremail });
  if (existingUser) {
    throw new Error("Email already exists. Please use a different email.");
  }

  // Create new user with Nano ID
  const newUser = new User({
    _id: nanoid(10),
    username,
    useremail,
    password, // NOTE: Hash password before saving in production!
    role,
    updatedBy: createdBy,
  });

  return await newUser.save();
};

// ✅ Update an existing user
exports.updateUser = async (userId, updateData, updatedBy) => {
  try {
    console.log("\U0001f539 Updating User:", userId);
    console.log("\U0001f539 Update Data:", updateData);
    console.log("\U0001f539 Updated By:", updatedBy);

    // \u2705 Convert `updatedBy` to ObjectId
    if (!mongoose.Types.ObjectId.isValid(updatedBy)) {
      console.log("\u274c Invalid updatedBy ID format:", updatedBy);
      return { error: "Invalid updatedBy ID format" };
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("\u274c Invalid user ID format:", userId);
      return { error: "Invalid user ID format" };
    }

    if (updateData.useremail) {
      const existingUser = await User.findOne({ useremail: updateData.useremail });
      if (existingUser && existingUser._id.toString() !== userId) {
        console.log("\u274c Email already exists:", updateData.useremail);
        return { error: "Email already exists. Please use a different email." };
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...updateData,
        updatedBy: updatedBy ? updatedBy : null, // ✅ Handle undefined
        updatedAt: new Date(),  // ✅ Use `new Date()` instead of `Date.now()` for consistency
      },
      { new: true, runValidators: true }
    );
    
    

    if (!updatedUser) {
      console.log("\u274c User not found with ID:", userId);
      return { error: "User not found" };
    }

    console.log("\u2705 Updated User Successfully:", updatedUser);
    return {
      ...updatedUser.toObject(),
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    };

  } catch (error) {
    console.error("\u274c Error in updateUser service:", error);
    return { error: "An unexpected error occurred." };
  }
};

// ✅ Delete a user
exports.deleteUser = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId) && userId.length !== 10) {
    throw new Error("Invalid user ID format");
  }
  return await User.findByIdAndDelete(userId);
};
exports.countUsers = async () => {
  return await User.countDocuments();
};
exports.calculateTotalRevenue = async () => {
  try {
    console.log("🔍 Fetching successful orders...");

    // Fetch orders with successful payments
    const successfulOrders = await Cart.find({ paymentStatus: "successful" });

    console.log("✅ Successful Orders:", successfulOrders);

    // Check if orders exist
    if (!successfulOrders || successfulOrders.length === 0) {
      console.log("⚠️ No successful orders found.");
      return 0;
    }

    // Calculate total revenue
    const totalRevenue = successfulOrders.reduce((total, order) => {
      console.log("🛒 Processing Order:", order);
      const orderTotal = order.movies.reduce((sum, movie) => {
        console.log(`🎬 Movie: ${movie.title}, Price: ₹${movie.price}, Quantity: ${movie.quantity}`);
        return sum + (movie.price * movie.quantity);
      }, 0);

      console.log("💰 Order Total:", orderTotal);
      return total + orderTotal;
    }, 0);

    console.log("💵 Total Revenue Calculated:", totalRevenue);
    return totalRevenue;

  } catch (error) {
    console.error("❌ Error in calculateTotalRevenue:", error);
    throw new Error(error.message || "Error calculating total revenue");
  }
};
