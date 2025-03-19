import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // ✅ Cart Context for global state

// ✅ Import Pages
import Signup from "./page/Signup";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import Admindashboard from "./page/Admindashboard";
import Moviedetail from "./page/Moviedetail";
import AddMovie from "./component/AddMovie";
import Payment from "./page/Payment"; // ✅ Payment Page
// ✅ New Orders Page

// ✅ Import Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import Orders from "./page/Orders";

const App = () => {
  return (
    <CartProvider> {/* ✅ Wrap with CartProvider for global cart state */}
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Routes for Users */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/movies/:id" element={<Moviedetail />} />
          <Route path="/payment" element={<Payment />} /> {/* ✅ Payment Route */}
          <Route path="/orders" element={<Orders />} /> {/* ✅ Orders Route */}
        </Route>

        {/* ✅ Protected Routes for Superadmin */}
        <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
          <Route path="/admindashboard" element={<Admindashboard />} />
          <Route path="/addmovie" element={<AddMovie />} />
        </Route>

        {/* ✅ Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </CartProvider>
  );
};

export default App;
