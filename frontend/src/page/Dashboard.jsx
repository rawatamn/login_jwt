import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Movies from "../component/Movies";
import Corousel from "../component/Corousel";
import Footer from "../component/Footer";
import { fetchUser } from "../api/userApi";
// ✅ Import user API function

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUser(); // ✅ Fetch user from API
        setUser(userData);

        // Store data in localStorage
        localStorage.setItem("username", userData.username);
        localStorage.setItem("userRole", userData.role);
        localStorage.setItem("userId", userData.userId);
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    getUser();
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
