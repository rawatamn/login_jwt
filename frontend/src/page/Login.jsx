import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser } from "../api/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { localStorageUtils } from "../utils/localStorageUtils";
import { LocalStorageKeys } from "../constants/enums";
import Loader from "../component/Loader";
import { toast, ToastContainer } from "react-toastify"; // Import Toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Ensure Toastify CSS is imported

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validation Schema
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
        const data = await loginUser(values);
        if (!data.data.token) {
          throw new Error("No token received from server.");
        }

        const { token, role } = data.data;
        const decoded = JSON.parse(atob(token.split(".")[1]));

        // Store user data in localStorage
        localStorageUtils.setItem(LocalStorageKeys.TOKEN, token);
        localStorageUtils.setItem(LocalStorageKeys.USER_ROLE, role);
        localStorageUtils.setItem(LocalStorageKeys.USER_ID, decoded.id);

        toast.success("Login Successful! 🎉"); // Show success toast
        setTimeout(() => navigate(role === "admin" ? "/admindashboard" : "/dashboard"), 1500);
      } catch (error) {
        console.error(" Login Error:", error.response?.data?.message || "Login failed");
        setErrors({ general: error.response?.data?.message || "Login failed" });
        toast.error(error.response?.data?.message || "Invalid credentials! "); // Show error toast
      }
      setLoading(false);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* Ensure ToastContainer is present */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">Welcome Back</h2>

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

          {/* Password Input with Eye Icon */}
          <div className="relative">
            <input
              {...formik.getFieldProps("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 bg-white/30 border border-white/40 rounded-lg focus:ring-2 focus:ring-white text-white placeholder-white transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {formik.touched.password && formik.errors.password && (
              <p className="text-red-300 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-white text-indigo-500 font-bold py-3 rounded-lg hover:bg-indigo-600 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            {loading ? <Loader /> : "Login"}
          </motion.button>
        </form>

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
