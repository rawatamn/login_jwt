import React, { useState, useEffect } from "react";
import { fetchRevenueDetails } from "../api/adminApi";


const RevenueList = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRevenueDetails = async () => {
      try {
        const data = await fetchRevenueDetails();
        setRevenueData(data);
      } catch (error) {
        console.error("❌ Error fetching revenue details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRevenueDetails();
  }, []);

  if (loading) return <p>Loading revenue details...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Revenue Details</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">User</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Total Spent</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {revenueData.length > 0 ? (
            revenueData.map((user) => (
              <tr key={user.userId}>
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">₹{user.totalSpent}</td>
                <td className="border p-2">{user.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border p-2 text-center">
                No revenue data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RevenueList;
