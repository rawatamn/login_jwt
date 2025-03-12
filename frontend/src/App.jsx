import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import Admindashboard from "./page/Admindashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* ✅ Protect /dashboard for "user" role only */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* ✅ Protect /admindashboard for "superadmin" role only */}
      <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
        <Route path="/admindashboard" element={<Admindashboard />} />
      </Route>

      {/* ✅ Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
