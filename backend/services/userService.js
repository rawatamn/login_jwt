import User from "../models/user.js";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import Cart from "../models/cart.js";
import Messages from "../utilities/message.js";
import Order from "../models/Order.js";
// Fetch logged-in user
export const getLoggedInUsers = async (userId) => {
  return await User.findById(userId).select("-password");
};

// Fetch all users (excluding superadmins)
export const getAllUser = async () => {
  return await User.find({ role: { $ne: "superadmin" } }).select("-password");
};

// Create a new user
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

// Update an existing user
export const updateUsers = async (userId, updateData, updatedBy) => {
  try {
   
    if (!mongoose.Types.ObjectId.isValid(userId)) {
     
      return { error: Messages.VALIDATION.INVALID_INPUT };
    }

    if (updateData.useremail) {
      const existingUser = await User.findOne({ useremail: updateData.useremail });
      if (existingUser && existingUser._id.toString() !== userId) {
       
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
      
      return { error: Messages.USER.Not_Found };
    }

    
    return {
      ...updatedUsers.toObject(),
      createdAt: updatedUsers.createdAt.getTime(),
      updatedAt: updatedUsers.updatedAt.getTime(),
    };

  } catch (error) {
    console.error(" Error in updateUser service:", error);
    return { error: Messages.ERROR.UNKNOWN_ERROR};
  }
};

// Delete a user
// Delete a user by _id (ObjectId)
export const deleteUsers = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(Messages.VALIDATION.INVALID_INPUT);
  }

  return await User.findByIdAndUpdate(
    id,
    { isDeleted: true }, // Soft delete instead of removing the record
    { new: true }
  );
};


// Count total users
export const countUser = async () => {
  return await User.countDocuments();
};

// Calculate total revenue
export const calculateTotalRevenues = async () => {
  try {
   

    // Fetch orders with successful payments
    const successfulOrders = await Order.find({ paymentStatus: "successful" });

    

    if (!successfulOrders || successfulOrders.length === 0) {
      
      return 0;
    }

    // Calculate total revenue
    const totalRevenue = successfulOrders.reduce((total, order) => {
     
      const orderTotal = order.movies.reduce((sum, movie) => {
        return sum + (movie.price * movie.quantity);
      }, 0);

      return total + orderTotal;
    }, 0);

    
    return totalRevenue;

  } catch (error) {
    console.error(" Error in calculateTotalRevenue:", error);
    throw new Error(error.message || Messages.Revenue.Total_Revenue);
  }
};
export const getUserRevenueService = async () => {
  try {
    const revenueData = await Order.aggregate([
      {
        $match: { paymentStatus: "successful" }, 
      },
      {
        $group: {
          _id: "$userId",
          totalSpent: { $sum: "$totalPrice" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "userId",
          as: "userDetails",
        },
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true, 
        },
      },
      {
        $addFields: {
          username: { $ifNull: ["$userDetails.username", "Unknown"] },
          isDeleted: { $ifNull: ["$userDetails.isDeleted", false] },
        },
      },
      {
        $addFields: {
          status: {
            $cond: {
              if: { $eq: ["$username", "Unknown"] },
              then: "Inactive",
              else: {
                $cond: {
                  if: { $eq: ["$isDeleted", true] },
                  then: "Inactive",
                  else: "Active",
                },
              },
            },
          },
        },
      },
      {
        $project: {
          userId: "$_id",
          username: 1,
          totalSpent: 1,
          status: 1,
        },
      },
    ]);

    return revenueData;
  } catch (error) {
    console.error("Error in getUserRevenueService:", error);
    throw new Error("Service error while fetching user revenue");
  }
};


