import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // ✅ Form Validation Schema
  const validationSchema = Yup.object({
    useremail: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
  });

  // ✅ Formik for Form Handling
  const formik = useFormik({
    initialValues: { useremail: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(""); // Reset previous messages
      try {
        const response = await axios.post("http://localhost:7000/api/auth/login", values);
        localStorage.setItem("token", response.data.data.token);
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed", error);
        setStatus("Invalid email or password.");
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {/* ✅ Show Error Messages */}
        {formik.status && <p className="text-red-500 text-sm text-center">{formik.status}</p>}

        <form onSubmit={formik.handleSubmit}>
          {/* ✅ Email Input */}
          <div className="mb-3">
            <label htmlFor="useremail" className="block text-gray-700 font-medium">Email</label>
            <input
              {...formik.getFieldProps("useremail")}
              type="email"
              id="useremail"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.useremail && formik.errors.useremail && (
              <p className="text-red-500 text-sm">{formik.errors.useremail}</p>
            )}
          </div>

          {/* ✅ Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              {...formik.getFieldProps("password")}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
