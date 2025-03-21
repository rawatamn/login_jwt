import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser } from "../api/authApi";
 // ✅ Import login API function

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    useremail: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
  });

  const formik = useFormik({
    initialValues: { useremail: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      setLoading(true);
      try {
        const data = await loginUser(values); // ✅ Call API function
        console.log("🔍 Server Response:", data);

        if (!data.data.token) {
          throw new Error("No token received from server.");
        }

        const { token, role } = data.data;

        // ✅ Decode JWT Token to get userId
        const decoded = JSON.parse(atob(token.split(".")[1])); 
        console.log("Decoded Token:", decoded);

        // ✅ Store token, role, and userId in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", decoded.id);

        console.log("Stored userId:", decoded.id);

        // ✅ Redirect based on role
        navigate(role === "admin" ? "/admindashboard" : "/dashboard");
      } catch (error) {
        setErrors({ general: error.response?.data?.message || "Login failed" });
      }
      setLoading(false);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">Welcome Back</h2>

        {/* ✅ Show Error Messages */}
        {formik.errors.general && (
          <p className="text-red-300 text-sm text-center mb-3">{formik.errors.general}</p>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <input
              {...formik.getFieldProps("useremail")}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-white/30 border border-white/40 rounded-lg focus:ring-2 focus:ring-white text-white placeholder-white transition-all duration-300"
            />
            {formik.touched.useremail && formik.errors.useremail && (
              <p className="text-red-300 text-sm mt-1">{formik.errors.useremail}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              {...formik.getFieldProps("password")}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-white/30 border border-white/40 rounded-lg focus:ring-2 focus:ring-white text-white placeholder-white transition-all duration-300"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-300 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-white text-indigo-500 font-bold py-3 rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* ✅ "Don't have an account? Register" Link */}
        <p className="mt-6 text-center text-white text-lg">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-yellow-300 font-bold cursor-pointer hover:text-yellow-500 transition duration-200"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
