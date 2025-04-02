import { LocalStorageKeys } from "../constants/enums";

export const localStorageUtils = {
  setItem: (key, value) => {
    try {
      const isObject = typeof value === "object";
      localStorage.setItem(key, isObject ? JSON.stringify(value) : value);
    } catch (error) {
      console.error(`Error storing "${key}" in localStorage:`, error);
    }
  },

  getItem: (key) => {
    try {
      const data = localStorage.getItem(key);
      // Check if data is valid JSON before parsing
      if (data && (data.startsWith("{") || data.startsWith("["))) {
        return JSON.parse(data);
      }
      return data; // Return plain string if not JSON
    } catch (error) {
      console.error(`Error retrieving "${key}" from localStorage:`, error);
      return null;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing "${key}" from localStorage:`, error);
    }
  },

  clearStorage: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};
