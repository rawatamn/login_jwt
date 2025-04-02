import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/apiRoutes";
// 👥 Fetch All Users
export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get(API.USERS);
    return response.data;
  } catch (error) {
    console.error(" Error fetching users:", error.response?.data || error.message);
    throw error;
  }
};


export const deleteUser = async (userId) => {
  try {
    // Log the userId to ensure the correct one is being used
    console.log('Deleting user with userId:', userId);

    const url = `${API.USERS}/${userId}`
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error.response?.data || error.message);
    throw error;
  }
};






//  Update a User
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axiosInstance.put(`${API.USERS}/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(" Error updating user:", error.response?.data || error.message);
    throw error;
  }
};
