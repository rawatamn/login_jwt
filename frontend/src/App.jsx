import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";  // ✅ Import Navigate for redirection
import Signup from "./page/Signup";
import Login from "./page/Login";

const App = () => {
  return (
    <Routes>
      {/* ✅ Redirect "/" to "/signup" */}
      <Route path="/" element={<Navigate to="/signup" />} />
      
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
