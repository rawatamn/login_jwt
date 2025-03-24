import {getLoggedInUsers,getAllUser,createUsers,updateUsers,deleteUsers,calculateTotalRevenues,countUser} from "../services/userService.js"; // ✅ Add `.js` extension

// ✅ Fetch Logged-in User
export const getLoggedInUser = async (req, res) => {
  try {
    console.log("🔹 Extracted User ID from Token:", req.user.id);
    if (!req.user.id) {
      return res.status(400).json({ message: "User ID is missing from request" });
    }

    const user = await getLoggedInUsers(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User Found:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error fetching user details:", error);
    res.status(500).json({ message: "Error fetching user details", error });
  }
};

// ✅ Fetch All Users (Superadmin Only)
export const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Superadmins only." });
    }
    const users = await getAllUser();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// ✅ Create New User (Superadmin Only)
export const createUser = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Superadmins only." });
    }

    const newUser = await createUsers(req.body, req.user.username);
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
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
      return res.status(400).json({ message: "Invalid token. User ID missing." });
    }

    if (req.user.role !== "superadmin") {
      console.log("❌ Access denied: User is not a superadmin");
      return res.status(403).json({ message: "Access denied. Superadmins only." });
    }

    const result = await updateUsers(req.params.id, req.body, req.user.id);

    if (result.error) {
      console.log("❌ Error in updateUser service:", result.error);
      return res.status(400).json({ message: result.error });
    }

    console.log("✅ User updated successfully:", result);
    res.status(200).json({ message: "User updated successfully", formattedUser: result });

  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// ✅ Delete User (Superadmin Only)
export const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Superadmins only." });
    }

    const deletedUser = await deleteUsers(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// ✅ Get User Count
export const getUserCount = async (req, res) => {
  try {
    const totalUsers = await countUser();
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user count", error });
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
    res.status(500).json({ message: "Error fetching total revenue", error: error.message });
  }
};
