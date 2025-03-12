import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  console.log("ProtectedRoute Debug:", { token, userRole });

  if (!token) {
    return <Navigate to="/login" />;
  }

  // ✅ Check if the user has permission to access the route
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={userRole === "superadmin" ? "/admindashboard" : "/dashboard"} />;
  }

  return <Outlet />; // ✅ Ensure child components render correctly
}

export default ProtectedRoute;
