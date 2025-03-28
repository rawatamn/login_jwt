import React, { useEffect, useState } from "react";
import AddMovie from "./AddMovie";
import { deleteMovie, fetchMovies } from "../api/movieAdminapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../component/Loader";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [editMovie, setEditMovie] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
      } catch (error) {
        toast.error("Error loading movies. ❌");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
      toast.success("Movie deleted successfully! ✅");
    } catch (error) {
      toast.error("Error deleting movie. ❌");
    }
  };

  const handleEdit = (movie) => {
    setEditMovie(movie);
    setShowAddMovie(true);
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />

      <h2 className="text-2xl font-bold mb-4">Manage Movies</h2>

      <button
        onClick={() => {
          setEditMovie(null);
          setShowAddMovie(!showAddMovie);
        }}
        className="bg-blue-500 text-white px-4 py-2 mb-6 rounded"
      >
        {showAddMovie ? "✖ Close Movie Form" : "➕ Add New Movie"}
      </button>

      {showAddMovie && (
        <AddMovie
          setMovies={setMovies}
          setShowAddMovie={setShowAddMovie}
          editMovie={editMovie}
        />
      )}

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
