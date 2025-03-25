import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/apiRoutes";
// 👥 Fetch All Users
export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get(API.USERS);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching users:", error.response?.data || error.message);
    throw error;
  }
};

// 🗑️ Delete a User
export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`${API.USERS}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting user:", error.response?.data || error.message);
    throw error;
  }
};

// ✏️ Update a User
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axiosInstance.put(`${API.USERS}/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating user:", error.response?.data || error.message);
    throw error;
  }
};
