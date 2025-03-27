import React, { useEffect, useState } from "react";
import { fetchUserRevenue } from "../api/adminApi";

const RevenueList = () => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const loadRevenueData = async () => {
      try {
        const data = await fetchUserRevenue();
        setRevenueData(data);
      } catch (error) {
        console.error("❌ Error fetching revenue data:", error);
      }
    };

    loadRevenueData();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Revenue Contribution</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-3">User ID</th>
            <th className="border p-3">Username</th>
            <th className="border p-3">Total Spent (₹)</th>
            <th className="border p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {revenueData.length > 0 ? (
            revenueData.map((user) => (
              <tr key={user.userId} className="text-center">
                <td className="border p-3">{user.userId}</td>
                <td className="border p-3">{user.username}</td>
                <td className="border p-3">₹{user.totalSpent}</td>
                <td
                  className={`border p-3 font-bold ${
                    user.status === "Deleted"
                      ? "text-red-500"
                      : user.status === "Inactive"
                      ? "text-gray-500"
                      : "text-green-500"
                  }`}
                >
                  {user.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border p-3 text-center text-gray-500">
                No revenue data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RevenueList;
