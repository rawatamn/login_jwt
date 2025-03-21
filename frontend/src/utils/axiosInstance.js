// src/axiosInstance.js
import axios from 'axios';

const api_url = import.meta.env.VITE_BACKEND_URL;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: api_url, // Base URL for the API
  headers: {
    'Content-Type': 'application/json', // Set content type for all requests
  },
});

// Intercept requests and add Authorization token to headers if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
