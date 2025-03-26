import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Movies from "../component/Movies";
import Corousel from "../component/Corousel";
import Footer from "../component/Footer";
import { fetchUser } from "../api/userApi";
import { localStorageUtils } from "../utils/localStorageUtils"; // ✅ Import local storage utils
import { LocalStorageKeys } from "../constants/enums"; // ✅ Import enums

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUser(); // ✅ Fetch user from API
        setUser(userData);

        localStorageUtils.setItem(LocalStorageKeys.USERNAME, userData.username);
        localStorageUtils.setItem(LocalStorageKeys.USER_ROLE, userData.role);
        localStorageUtils.setItem(LocalStorageKeys.USER_ID, userData.userId);
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
