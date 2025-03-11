import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Must be at least 3 characters").required("Required"),
    useremail: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
  });

  const formik = useFormik({
    initialValues: { username: "", useremail: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:7000/api/auth/register", {
          ...values,
          role: "user", // Ensure role is always included
        });
        navigate("/login");
      } catch (error) {
        console.error("Signup failed", error.response?.data || error.message);
      }
    },
    
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={formik.handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {/* Username Input */}
        <input 
          {...formik.getFieldProps("username")} 
          placeholder="Username" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-red-500 text-sm">{formik.errors.username}</p>
        )}

        {/* Email Input */}
        <input 
          {...formik.getFieldProps("useremail")} 
          placeholder="Email" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.useremail && formik.errors.useremail && (
          <p className="text-red-500 text-sm">{formik.errors.useremail}</p>
        )}

        {/* Password Input */}
        <input 
          {...formik.getFieldProps("password")} 
          type="password" 
          placeholder="Password" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
