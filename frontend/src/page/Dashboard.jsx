import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Movies from "../component/Movies";
import Corousel from "../component/Corousel";
import Footer from "../component/Footer";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("🔴 No token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      try {
        console.log("🔍 Fetching user data...");
        const response = await axios.get("http://localhost:7000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ User Data:", response.data);
        setUser(response.data);

        // Store data in localStorage
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("userRole", response.data.role);
        localStorage.setItem("userId", response.data.userId);  // Storing userId

      } catch (error) {
        console.error("❌ Failed to fetch user data:", error.response?.data || error.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) return <h1 className="text-center mt-10">🔄 Loading Dashboard...</h1>;
  if (!user) return <h1 className="text-center mt-10 text-red-500">❌ Error: User data not found</h1>;

  return (
    <div>
      <Navbar />
      <Corousel />
      <Movies />
      <Footer />
    </div>
  );
};

export default Dashboard;
