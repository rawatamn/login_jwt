const User = require("../models/user");
const mongoose = require("mongoose");
const moment = require("moment");
const { nanoid } = require("nanoid");

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
  const { username, useremail, role } = updateData;

  // Validate MongoDB ObjectId or nanoid
  if (!mongoose.Types.ObjectId.isValid(userId) && userId.length !== 10) {
    throw new Error("Invalid user ID format");
  }

  // Check if new email already exists in another user
  const existingUser = await User.findOne({ useremail });
  if (existingUser && existingUser._id.toString() !== userId) {
    throw new Error("Email already exists. Please use a different email.");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      username,
      useremail,
      role,
      updatedBy,
      updatedAt: Date.now(),
    },
    { new: true, runValidators: true }
  );

  if (!updatedUser) return null;

  return {
    ...updatedUser.toObject(),
    createdAt: moment(updatedUser.createdAt).valueOf(),
    updatedAt: moment(updatedUser.updatedAt).valueOf(),
  };
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
