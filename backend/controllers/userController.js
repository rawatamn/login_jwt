const userService = require("../services/userService");

// ✅ Fetch Logged-in User
exports.getLoggedInUser = async (req, res) => {
  try {
    const user = await userService.getLoggedInUser(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
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
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Superadmins only." });
    }

    const updatedUser = await userService.updateUser(req.params.id, req.body, req.user.username);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", formattedUser: updatedUser });

  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
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
