import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { registerUser } from "../api/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // ✅ Import Eye Icons
import Loader from "../component/Loader";
import { toast, ToastContainer } from "react-toastify"; // ✅ Import Toaster
import "react-toastify/dist/ReactToastify.css"; // ✅ Toaster CSS

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ Toggle Password Visibility

  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Must be at least 3 characters").required("Required"),
    useremail: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
  });

  const formik = useFormik({
    initialValues: { username: "", useremail: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await registerUser(values); // ✅ Call API function
        toast.success("Signup Successful! 🎉"); // ✅ Show success toaster
        setTimeout(() => navigate("/login"), 1500); // ✅ Redirect after toast
      } catch (error) {
        console.error("Signup Error:", error);
        toast.error(error.response?.data?.message || "Signup Failed! ❌"); // ✅ Show error toaster
      }
      setLoading(false);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500">
      <ToastContainer position="top-right" autoClose={3000} /> {/* ✅ Toaster Container */}

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">Create Account</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Username Input */}
          <div className="relative">
            <input
              {...formik.getFieldProps("username")}
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 bg-white/30 border border-white/40 rounded-lg focus:ring-2 focus:ring-white text-white placeholder-white transition-all duration-300"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-300 text-sm mt-1">{formik.errors.username}</p>
            )}
          </div>

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
              type={showPassword ? "text" : "password"} // ✅ Toggle visibility
              placeholder="Password"
              className="w-full px-4 py-3 bg-white/30 border border-white/40 rounded-lg focus:ring-2 focus:ring-white text-white placeholder-white transition-all duration-300"
            />
            {/* ✅ Eye Toggle Button */}
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

          {/* Submit Button with Loader */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-white text-blue-500 font-bold py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center"
          >
            {loading ? <Loader /> : "Sign Up"}
          </motion.button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-white text-lg">
          Already have an account?{" "}
          <span
            className="text-yellow-300 font-bold cursor-pointer hover:text-yellow-500 transition duration-200"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
