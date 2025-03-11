import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:7000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      {user ? (
        <div className="mt-4 p-4 border rounded-lg shadow">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.useremail}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
