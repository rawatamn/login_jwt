import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";

const App = () => {
  const token = localStorage.getItem("token"); // ✅ Check token

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* ✅ Redirect if not logged in */}
      <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />

      {/* ✅ Redirect unknown routes to Login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
