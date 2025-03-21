import React, { useEffect, useState } from "react";

import AddMovie from "./AddMovie"; // Import AddMovie component
import { deleteMovie, fetchMovies } from "../api/movieAdminapi";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddMovie, setShowAddMovie] = useState(false); // ✅ Toggle Add/Edit Form
  const [editMovie, setEditMovie] = useState(null); // ✅ Store movie to edit

  // ✅ Fetch Movies from API
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error("❌ Error loading movies.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  // ✅ Delete Movie Function
  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      setMovies(movies.filter((movie) => movie._id !== id));
      alert("Movie deleted successfully!");
    } catch (error) {
      alert("Error deleting movie.");
    }
  };

  // ✅ Edit Movie Function
  const handleEdit = (movie) => {
    setEditMovie(movie); // Set movie to edit
    setShowAddMovie(true); // Show the form
  };

  if (loading) return <p className="text-center">Loading movies...</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Movies</h2>

      {/* ✅ Toggle Add/Edit Movie Form */}
      <button
        onClick={() => {
          setEditMovie(null); // Reset edit state
          setShowAddMovie(!showAddMovie);
        }}
        className="bg-blue-500 text-white px-4 py-2 mb-6 rounded"
      >
        {showAddMovie ? "✖ Close Movie Form" : "➕ Add New Movie"}
      </button>

      {/* ✅ Show AddMovie Component for Adding/Editing */}
      {showAddMovie && (
        <AddMovie
          setMovies={setMovies}
          setShowAddMovie={setShowAddMovie}
          editMovie={editMovie} // ✅ Pass movie to edit
        />
      )}

      {/* ✅ Movie List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            <img
              src={movie.image || "https://via.placeholder.com/300x450"}
              alt={movie.title}
              className="w-64 h-96 object-cover rounded-lg mb-3"
            />
            <h3 className="text-xl font-semibold text-center">{movie.title}</h3>
            <p className="text-gray-500 text-sm">{movie.release_date}</p>
            <p className="text-gray-700 font-semibold">Genre: {movie.genre || "N/A"}</p>
            <p className="text-yellow-500 font-semibold">⭐ {movie.rating || "N/A"}/10</p>
            <p className="text-lg font-bold text-green-600 mt-2">₹{movie.price}</p>

            {/* ✅ Action Buttons */}
            <div className="mt-4 flex space-x-3">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => handleEdit(movie)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(movie._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
