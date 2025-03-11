import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Movies from "../component/Movies";
import Corousel from "../component/Corousel";
import Footer from "../component/Footer";

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
        localStorage.setItem("username", response.data.username); // ✅ Store username
      } catch (error) {
        console.error("Failed to fetch user data", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Corousel/>
    <Movies/>
    <Footer/>
    </div>
  );
};

export default Dashboard;
