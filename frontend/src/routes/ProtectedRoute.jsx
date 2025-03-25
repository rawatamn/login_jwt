import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

 

  if (!token) {
    console.warn("⚠️ No token found, redirecting to login...");
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.warn("⚠️ Unauthorized access! Redirecting...");
    return <Navigate to={userRole === "superadmin" ? "/admindashboard" : "/dashboard"} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
