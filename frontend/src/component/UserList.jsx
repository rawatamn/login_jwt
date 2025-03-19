import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUserId, setEditUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ username: "", useremail: "", role: "" });
  const [isSaving, setIsSaving] = useState(false); // Track save process

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch Users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("🔴 No token found. Redirecting to login...");
        window.location.href = "/login";
        return;
      }

      const response = await axios.get("http://localhost:7000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(response.data);
    } catch (error) {
      console.error("❌ Error fetching users:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Failed to load users.");
    } finally {
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
      setErrorMessage("Failed to delete user.");
    }
  };

  // ✅ Start Editing a User
  const handleEdit = (user) => {
    setEditUserId(user._id);
    setFormData({ username: user.username, useremail: user.useremail, role: user.role });
    setErrorMessage("");
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save Updated User
  const handleSaveEdit = async () => {
    try {
      setIsSaving(true);
      setErrorMessage("");
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:7000/api/users/${editUserId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("🟢 User updated:", response.data);

      setUsers(users.map(user =>
        user._id === editUserId ? { ...user, ...formData, updatedBy: response.data.formattedUser.updatedBy } : user
      ));

      setEditUserId(null);
    } catch (error) {
      console.error("❌ Error updating user:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading users...</p>;

  return (
    <div className="mt-6 p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-3">User List</h2>

      {/* ✅ Show Error Message */}
      {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Updated By</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border p-2">{user._id}</td>
              <td className="border p-2">
                {editUserId === user._id ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="border px-2 py-1"
                    autoFocus
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="border p-2">
                {editUserId === user._id ? (
                  <input
                    type="email"
                    name="useremail"
                    value={formData.useremail}
                    onChange={handleChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  user.useremail
                )}
              </td>
              <td className="border p-2">
                {editUserId === user._id ? (
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="border p-2">{user.updatedBy || "N/A"}</td>
              <td className="border p-2">
                {editUserId === user._id ? (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className={`bg-green-500 text-white px-3 py-1 rounded mr-2 ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditUserId(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
