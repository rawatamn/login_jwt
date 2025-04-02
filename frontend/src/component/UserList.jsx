import React, { useEffect, useState } from "react";
import { deleteUser, fetchUsers, updateUser } from "../api/adminUserApi";
import { toast, ToastContainer } from "react-toastify"; // Import Toaster
import "react-toastify/dist/ReactToastify.css"; // Toaster CSS

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUserId, setEditUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ username: "", useremail: "", role: "" });
  const [isSaving, setIsSaving] = useState(false); // Track save process

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        setErrorMessage("Failed to load users.");
        toast.error("Error loading users!");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Start Editing a User
  const handleEdit = (user) => {
    setEditUserId(user._id);
    setFormData({ username: user.username, useremail: user.useremail, role: user.role });
    setErrorMessage("");
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Check if form data has changed
  const isFormUnchanged =
    users.find(user => user._id === editUserId)?.username === formData.username &&
    users.find(user => user._id === editUserId)?.useremail === formData.useremail &&
    users.find(user => user._id === editUserId)?.role === formData.role;

  // Save Updated User
  const handleSaveEdit = async () => {
    try {
      setIsSaving(true);
      setErrorMessage("");
      await updateUser(editUserId, formData); // Perform the update request

      // Fetch updated user list
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
      setEditUserId(null); // Exit edit mode
      toast.success("User updated successfully! ✅");
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      toast.error("Failed to update user! ");
    } finally {
      setIsSaving(false);
    }
  };

  // Soft Delete User with Confirmation
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUser(userId); // Mark the user as deleted
      setUsers(users.map(user => user._id === userId ? { ...user, isDeleted: true } : user));
      toast.success("User marked as deleted successfully! ✅");
    } catch (error) {
      setErrorMessage("Failed to delete user.");
      toast.error("Error deleting user! ");
    }
  };

  return (
    <div className="mt-6 p-5 bg-white shadow-md rounded-lg">
      <ToastContainer position="top-right" autoClose={3000} /> {/* Toaster */}

      <h2 className="text-xl font-bold mb-3">User List</h2>

      {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

      {loading ? (
        <div className="flex justify-center mt-4">
          <div className="loader"></div>
        </div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border p-2">{user._id}</td>
                <td className="border p-2">
                  {editUserId === user._id ? (
                    <input type="text" name="username" value={formData.username} onChange={handleChange} className="border px-2 py-1" autoFocus />
                  ) : user.username}
                </td>
                <td className="border p-2">
                  {editUserId === user._id ? (
                    <input type="email" name="useremail" value={formData.useremail} onChange={handleChange} className="border px-2 py-1" />
                  ) : user.useremail}
                </td>
                <td className="border p-2">
                  {editUserId === user._id ? (
                    <select name="role" value={formData.role} onChange={handleChange} className="border px-2 py-1">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : user.role}
                </td>
                <td className="border p-2">
                  {user.isDeleted ? (
                    <span className="text-red-500">Inactive</span>
                  ) : (
                    <span className="text-green-500">Active</span>
                  )}
                </td>
                <td className="border p-2">
                  {editUserId === user._id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className={`bg-green-500 text-white px-3 py-1 rounded mr-2 ${isSaving || isFormUnchanged ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isSaving || isFormUnchanged}
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </button>
                      <button onClick={() => setEditUserId(null)} className="bg-gray-500 text-white px-3 py-1 rounded" disabled={isSaving}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                      {!user.isDeleted && (
                        <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
