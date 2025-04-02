import React, { useState, useEffect } from "react";
import { addMovie, updateMovie, fetchMovies } from "../api/movieAdminapi";

const AddMovie = ({ setMovies, setShowAddMovie, editMovie }) => {
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    image: "",
    release_date: "",
    price: "",
    genre: "",
    rating: "",
  });

  // Prefill form when editing
  useEffect(() => {
    if (editMovie) {
      setFormData(editMovie);
    } else {
      resetForm(); // Reset form when adding a new movie
    }
  }, [editMovie]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to reset form fields
  const resetForm = () => {
    setFormData({
      title: "",
      overview: "",
      image: "",
      release_date: "",
      price: "",
      genre: "",
      rating: "",
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMovie) {
        await updateMovie(editMovie._id, formData);
        setMovies((prev) =>
          prev.map((m) => (m._id === editMovie._id ? { ...m, ...formData } : m))
        );
      } else {
        await addMovie(formData);
        const updatedMovies = await fetchMovies(); // Fetch updated movies
        setMovies(updatedMovies);
      }

      resetForm(); // Clear the form
      setShowAddMovie(false); // Close the form dropdown
    } catch (error) {
      console.error(" Error saving movie:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold">{editMovie ? "Edit Movie" : "Add Movie"}</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
        <input type="text" name="overview" value={formData.overview} onChange={handleChange} placeholder="Overview" className="w-full p-2 border rounded" required />
        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" required />
        <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
        <input type="text" name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" className="w-full p-2 border rounded" required />
        <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          {editMovie ? "Update Movie" : "Add Movie"}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
