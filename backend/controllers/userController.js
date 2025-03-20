const userService = require("../services/userService");

// ✅ Fetch Logged-in User
exports.getLoggedInUser = async (req, res) => {
  try {
    console.log("🔹 Extracted User ID from Token:", req.user.id);
    if (!req.user.id) {
      return res.status(400).json({ message: "User ID is missing from request" });
    }

    const user = await userService.getLoggedInUser(req.user.id);
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
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Superadmins only." });
    }
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// ✅ Create New User (Superadmin Only)
exports.createUser = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Superadmins only." });
    }

    const newUser = await userService.createUser(req.body, req.user.username);
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// ✅ Update User (Superadmin Only)
exports.updateUser = async (req, res) => {
  try {
    console.log("🔹 Received update request for User ID:", req.params.id);
    console.log("🔹 Update Data:", req.body);
    console.log("🔹 Updated By (User ID):", req.user.id); // ✅ Fix: Use `req.user.id`

    if (!req.user || !req.user.id) {
      console.log("❌ Updated By (User ID) is missing");
      return res.status(400).json({ message: "Invalid token. User ID missing." });
    }

    if (req.user.role !== "superadmin") {
      console.log("❌ Access denied: User is not a superadmin");
      return res.status(403).json({ message: "Access denied. Superadmins only." });
    }

    // ✅ Pass `req.user.id` instead of `req.user._id`
    const result = await userService.updateUser(req.params.id, req.body, req.user.id);

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
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Superadmins only." });
    }

    const deletedUser = await userService.deleteUser(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
exports.getUserCount = async (req, res) => {
  try {
    const totalUsers = await userService.countUsers();
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user count", error });
  }
};
exports.getTotalRevenue = async (req, res) => {
  try {
    console.log("🔹 Fetching total revenue...");
    const totalRevenue = await userService.calculateTotalRevenue();
    console.log("✅ Total Revenue:", totalRevenue);
    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error("❌ Error fetching total revenue:", error);
    res.status(500).json({ message: "Error fetching total revenue", error: error.message });
  }
};
