import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { localStorageUtils } from "../utils/localStorageUtils"; // Import Utility
import { LocalStorageKeys } from "../constants/enums"; // Import Enum Keys

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorageUtils.getItem(LocalStorageKeys.TOKEN);
  const userRole = localStorageUtils.getItem(LocalStorageKeys.USER_ROLE);

  // If no token, redirect to login
  if (!token) {
    console.warn("⚠️ No token found, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  // If user role is not allowed, redirect to respective dashboard
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.warn("⚠️ Unauthorized access! Redirecting...");
    return <Navigate to={userRole === "superadmin" ? "/admindashboard" : "/dashboard"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
