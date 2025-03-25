import {getLoggedInUsers,getAllUser,createUsers,updateUsers,deleteUsers,calculateTotalRevenues,countUser} from "../services/userService.js"; // ✅ Add `.js` extension
import Messages from "../utilities/message.js";
// ✅ Fetch Logged-in User
export const getLoggedInUser = async (req, res) => {
  try {
    console.log("🔹 Extracted User ID from Token:", req.user.id);
    if (!req.user.id) {
      return res.status(400).json({ message: Messages.USER.Id_Missing});
    }

    const user = await getLoggedInUsers(req.user.id);
    if (!user) {
      return res.status(404).json({ message: Messages.USER.Not_Found });
    }

    console.log("✅ User Found:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error fetching user details:", error);
    res.status(500).json({ message: Messages.USER.USER_DETAIL, error });
  }
};

// ✅ Fetch All Users (Superadmin Only)
export const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: Messages.SUPERADMIN.SUPERADMIN_ONLY });
    }
    const users = await getAllUser();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: Messages.USER.USER_DETAIL, error });
  }
};

// ✅ Create New User (Superadmin Only)
export const createUser = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: Messages.SUPERADMIN.SUPERADMIN_ONLY});
    }

    const newUser = await createUsers(req.body, req.user.username);
    res.status(201).json({ message: Messages.USER.USER_CREATION, newUser });
  } catch (error) {
    res.status(500).json({ message: Messages.USER.ERROR_CREATE, error });
  }
};

// ✅ Update User (Superadmin Only)
export const updateUser = async (req, res) => {
  try {
    console.log("🔹 Received update request for User ID:", req.params.id);
    console.log("🔹 Update Data:", req.body);
    console.log("🔹 Updated By (User ID):", req.user.id);

    if (!req.user || !req.user.id) {
      console.log("❌ Updated By (User ID) is missing");
      return res.status(400).json({ message: Messages.AUTH.INVALID_TOKEN });
    }

    if (req.user.role !== "superadmin") {
      console.log("❌ Access denied: User is not a superadmin");
      return res.status(403).json({ message:Messages.SUPERADMIN.SUPERADMIN_ONLY});
    }

    const result = await updateUsers(req.params.id, req.body, req.user.id);

    if (result.error) {
      console.log("❌ Error in updateUser service:", result.error);
      return res.status(400).json({ message: result.error });
    }

    console.log("✅ User updated successfully:", result);
    res.status(200).json({ message:Messages.USER.USER_UPDATE, formattedUser: result });

  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).json({ message: Messages.USER.USER_NOT_UPDATE, error: error.message });
  }
};

// ✅ Delete User (Superadmin Only)
export const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: Messages.SUPERADMIN.SUPERADMIN_ONLY });
    }

    const deletedUser = await deleteUsers(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: Messages.USER.Not_Found });
    }

    res.status(200).json({ message: Messages.USER.DELETED });
  } catch (error) {
    res.status(500).json({ message: Messages.USER.ERROR_DELETE, error });
  }
};

// ✅ Get User Count
export const getUserCount = async (req, res) => {
  try {
    const totalUsers = await countUser();
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: Messages.USER.ERROR_COUNT, error });
  }
};

// ✅ Get Total Revenue
export const getTotalRevenue = async (req, res) => {
  try {
    console.log("🔹 Fetching total revenue...");
    const totalRevenue = await calculateTotalRevenues();
    console.log("✅ Total Revenue:", totalRevenue);
    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error("❌ Error fetching total revenue:", error);
    res.status(500).json({ message: Messages.Revenue.Total_Revenue, error: error.message });
  }
};
