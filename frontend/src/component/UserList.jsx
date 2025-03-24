import React, { useEffect, useState } from "react";
import { deleteUser, fetchUsers, updateUser } from "../api/adminUserApi";

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
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

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
  
      await updateUser(editUserId, formData); // ✅ Perform the update request
      const usersData = await fetchUsers();  // ✅ Fetch updated user list
  
      setUsers(usersData); // ✅ Update state with fresh data
      setEditUserId(null); // ✅ Exit edit mode
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  

  // ✅ Delete User
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      setErrorMessage("Failed to delete user.");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading users...</p>;

  return (
    <div className="mt-6 p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-3">User List</h2>

      {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

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
                  <input type="text" name="role" value={formData.role} onChange={handleChange} className="border px-2 py-1" />
                ) : user.role}
              </td>
              <td className="border p-2">
                {editUserId === user._id ? (
                  <>
                    <button onClick={handleSaveEdit} className={`bg-green-500 text-white px-3 py-1 rounded mr-2 ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button onClick={() => setEditUserId(null)} className="bg-gray-500 text-white px-3 py-1 rounded" disabled={isSaving}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                    <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
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
