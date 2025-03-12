import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null); // State for editing user
  const [newRole, setNewRole] = useState(""); // State for updating user role

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch Users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("🔴 No token found in localStorage. Please log in again.");
        return;
      }

      console.log("🟢 Sending request with token:", token);
      const response = await axios.get("http://localhost:7000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching users:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        console.log("🔴 Redirecting to login due to expired token");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect user to login
      }
      setLoading(false);
    }
  };

  // ✅ Delete User
  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:7000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter(user => user._id !== userId));
      console.log("🟢 User deleted successfully.");
    } catch (error) {
      console.error("❌ Error deleting user:", error.response?.data || error.message);
    }
  };

  // ✅ Start Editing User
  const handleEdit = (user) => {
    setEditUser(user);
    setNewRole(user.role); // Set role for editing
  };

  // ✅ Save Edited User
  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:7000/api/users/${editUser._id}`,
        { role: newRole }, // Updating only role (modify as needed)
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("🟢 User updated:", response.data);

      setUsers(users.map(user => (user._id === editUser._id ? { ...user, role: newRole } : user)));
      setEditUser(null);
    } catch (error) {
      console.error("❌ Error updating user:", error.response?.data || error.message);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading users...</p>;

  return (
    <div className="mt-6 p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-3">User List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border p-2">{user._id}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.useremail}</td>
              <td className="border p-2">
                {editUser?._id === user._id ? (
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="border px-2 py-1"
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="border p-2">
                {editUser?._id === user._id ? (
                  <button onClick={handleSaveEdit} className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                    Edit
                  </button>
                )}
                <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
