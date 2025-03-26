import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Users, Film, BarChart2, LogOut } from "lucide-react";
import UserList from "../component/UserList";
import MovieList from "../component/MovieList";
import { fetchMovieCount, fetchTotalRevenue, fetchUserCount } from "../api/adminApi";
import { localStorageUtils } from "../utils/localStorageUtils";
import { LocalStorageKeys } from "../constants/enums";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, totalMovies: 0, totalRevenue: 0 });
  const [view, setView] = useState("dashboard");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const token = localStorageUtils.getItem(LocalStorageKeys.TOKEN);
        if (!token) {
          navigate("/login"); // ✅ Redirect if no token
          return;
        }

        // ✅ Fetch Stats using Centralized API
        const [totalUsers, totalMovies, totalRevenue] = await Promise.all([
          fetchUserCount(),
          fetchMovieCount(),
          fetchTotalRevenue(),
        ]);

        setStats({ totalUsers, totalMovies, totalRevenue });
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, []);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorageUtils.clearStorage(); // ✅ Clears all stored user data
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white h-full transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}>
        <div className="p-5 flex items-center justify-between">
          <h2 className={`text-xl font-bold transition-opacity duration-200 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
            Admin Panel
          </h2>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white focus:outline-none">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <ul className="mt-6">
          <li className="mb-3">
            <button onClick={() => setView("dashboard")} className="flex items-center p-3 bg-gray-700 rounded hover:bg-gray-600 w-full">
              <BarChart2 size={20} />
              {isSidebarOpen && <span className="ml-3">Dashboard</span>}
            </button>
          </li>
          <li className="mb-3">
            <button onClick={() => setView("users")} className="flex items-center p-3 hover:bg-gray-700 rounded w-full">
              <Users size={20} />
              {isSidebarOpen && <span className="ml-3">Manage Users</span>}
            </button>
          </li>
          <li className="mb-3">
            <button onClick={() => setView("movies")} className="flex items-center p-3 hover:bg-gray-700 rounded w-full">
              <Film size={20} />
              {isSidebarOpen && <span className="ml-3">Manage Movies</span>}
            </button>
          </li>
        </ul>

        <button onClick={handleLogout} className="mt-6 w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-3 rounded">
          <LogOut size={20} />
          {isSidebarOpen && <span className="ml-3">Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome, Admin</h1>

        {view === "dashboard" && (
          <div className="grid grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-bold">Total Users</h3>
              <p className="text-2xl">{stats.totalUsers}</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-bold">Total Movies</h3>
              <p className="text-2xl">{stats.totalMovies}</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-bold">Total Revenue</h3>
              <p className="text-2xl">₹{stats.totalRevenue}</p>
            </div>
          </div>
        )}

        {view === "users" && <UserList />}
        {view === "movies" && <MovieList />}
      </main>
    </div>
  );
};

export default AdminDashboard;
