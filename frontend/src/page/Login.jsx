import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
  // ✅ Yup Validation Schema
  const validationSchema = Yup.object({
    useremail: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // ✅ Formik for Form Handling
  const formik = useFormik({
    initialValues: {
      useremail: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(""); // Reset previous messages
      try {
        const response = await axios.post("http://localhost:7000/api/auth/login", values);
        setStatus({ success: "Login Successful!" });

        // ✅ Store token (if returned from API)
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          // Redirect user (if using React Router)
          window.location.href = "/dashboard"; // Change to the correct route
        }
      } catch (error) {
        setStatus({ error: error.response?.data.message || "Login Failed" });
      }
      setSubmitting(false);
    },
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/blue-white-gradient-abstract-background_53876-60241.jpg?t=st=1741242028~exp=1741245628~hmac=72482b4a9c3dec52ef6d6debc11038c3ecf7d73ad568ccda598f329f3fa19e16&w=740')`,
      }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
        {formik.status?.success && <p className="text-center text-green-500">{formik.status.success}</p>}
        {formik.status?.error && <p className="text-center text-red-500">{formik.status.error}</p>}

        <form onSubmit={formik.handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="useremail" className="block text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              id="useremail"
              name="useremail"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              {...formik.getFieldProps("useremail")}
            />
            {formik.touched.useremail && formik.errors.useremail && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.useremail}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
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
