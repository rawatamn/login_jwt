import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSearch, FaBars } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  // ✅ Fetch username from localStorage when the component loads
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // ✅ Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  // ✅ Navigate to Admin Login
  const handleAdminLogin = () => {
    navigate("/admin/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      {/* ✅ Logo */}
      <span className="text-3xl font-bold cursor-pointer">
        book<span className="text-red-500">my</span>show
      </span>

      {/* ✅ Search Bar */}
      <div className="flex items-center bg-gray-200 px-3 py-2 rounded-lg w-1/3">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search for Movies, Events, Plays, Sports"
          className="bg-transparent outline-none w-full"
        />
      </div>

      {/* ✅ User Info + Admin Icon */}
      <div className="flex items-center space-x-6">
        {/* ✅ User or Sign In */}
        {username ? (
          <div className="flex items-center space-x-3">
            <FaUser className="text-gray-700" />
            <span className="font-medium">Hey, {username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Sign In
          </button>
        )}

        {/* ✅ Admin Icon */}
        <FaUser
          onClick={handleAdminLogin}
          className="text-2xl cursor-pointer text-gray-600 hover:text-red-500"
          title="Admin Login"
        />
      </div>

      {/* ✅ Menu Icon */}
      <FaBars className="text-2xl cursor-pointer" />
    </nav>
  );
};

export default Navbar;
