import axios from "axios";
import { localStorageUtils } from "./localStorageUtils";
import { LocalStorageKeys } from "../constants/enums";

const api_url = import.meta.env.VITE_BACKEND_URL

// ✅ Create an Axios instance
const axiosInstance = axios.create({
  baseURL: api_url,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Intercept requests and add Authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorageUtils.getItem(LocalStorageKeys.TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Intercept responses to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);

    // ✅ If token expired or unauthorized, clear storage & redirect to login
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized! Clearing session & redirecting...");
      localStorageUtils.clearStorage();
      window.location.href = "/login"; // Redirect to login page
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
