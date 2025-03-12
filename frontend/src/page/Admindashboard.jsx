import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Users, Film, BarChart2, LogOut } from "lucide-react";
import UserList from "../component/UserList";


const Admindashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showUsers, setShowUsers] = useState(false); // ✅ State for toggling user list

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white h-full transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}>
        <div className="p-5 flex items-center justify-between">
          <h2 className={`text-xl font-bold transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
            Admin Panel
          </h2>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white focus:outline-none">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <ul className="mt-6">
          <li className="mb-3">
            <button className="flex items-center p-3 bg-gray-700 rounded hover:bg-gray-600 w-full">
              <BarChart2 size={20} />
              {isSidebarOpen && <span className="ml-3">Dashboard</span>}
            </button>
          </li>
          <li className="mb-3">
            <button
              onClick={() => setShowUsers(!showUsers)} // ✅ Toggle user list
              className="flex items-center p-3 hover:bg-gray-700 rounded w-full"
            >
              <Users size={20} />
              {isSidebarOpen && <span className="ml-3">Manage Users</span>}
            </button>
          </li>
          <li className="mb-3">
            <button className="flex items-center p-3 hover:bg-gray-700 rounded w-full">
              <Film size={20} />
              {isSidebarOpen && <span className="ml-3">Manage Movies</span>}
            </button>
          </li>
        </ul>

        <button
          onClick={handleLogout}
          className="mt-6 w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-3 rounded"
        >
          <LogOut size={20} />
          {isSidebarOpen && <span className="ml-3">Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome, Admin</h1>

        {/* Show Users Component When "Manage Users" is Clicked */}
        {showUsers && <UserList/>}
      </main>
    </div>
  );
};

export default Admindashboard;
