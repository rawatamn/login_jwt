import {getLoggedInUsers,getAllUser,createUsers,updateUsers,deleteUsers,calculateTotalRevenues,countUser, getUserRevenueService} from "../services/userService.js"; // ✅ Add `.js` extension
import Messages from "../utilities/message.js";
// ✅ Fetch Logged-in User
export const getLoggedInUser = async (req, res) => {
  try {
    
    if (!req.user.id) {
      return res.status(400).json({ message: Messages.USER.Id_Missing});
    }

    const user = await getLoggedInUsers(req.user.id);
    if (!user) {
      return res.status(404).json({ message: Messages.USER.Not_Found });
    }

   
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
   

    if (!req.user || !req.user.id) {
      
      return res.status(400).json({ message: Messages.AUTH.INVALID_TOKEN });
    }

    if (req.user.role !== "superadmin") {
     
      return res.status(403).json({ message:Messages.SUPERADMIN.SUPERADMIN_ONLY});
    }

    const result = await updateUsers(req.params.id, req.body, req.user.id);

    if (result.error) {
     
      return res.status(400).json({ message: result.error });
    }

   
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
   
    const totalRevenue = await calculateTotalRevenues();
   
    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error("❌ Error fetching total revenue:", error);
    res.status(500).json({ message: Messages.Revenue.Total_Revenue, error: error.message });
  }
};

// ✅ Controller to get user revenue contribution
export const getUserRevenue = async (req, res) => {
  try {
    const revenueData = await getUserRevenueService();
    res.status(200).json(revenueData);
  } catch (error) {
    console.error("❌ Error fetching user revenue:", error);
    res.status(500).json({ message: "Failed to fetch user revenue" });
  }
};