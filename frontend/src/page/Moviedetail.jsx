import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { ShoppingCart, Home } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { fetchMovieById } from "../api/movieApi";

const Moviedetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
  
    const loadMovie = async () => {
      try {
        if (!id) throw new Error("Movie ID is undefined.");
        const data = await fetchMovieById(id);
        ("🟢 Movie Data Fetched:", data);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    loadMovie();
  }, [id]);

  const handleAddToCart = () => {
    if (movie) {
      addToCart(movie);
      setCartMessage("Movie added to cart successfully!");
      setTimeout(() => setCartMessage(""), 3000);
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress color="secondary" />
      </Box>
    );

  if (error)
    return (
      <Typography textAlign="center" mt={5} fontSize="24px" color="red">
         {error}
      </Typography>
    );

  return (
    <div>
      <Navbar />

      {/* Background Blur Fix */}
      {movie.image && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${movie.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px) brightness(40%)",
            zIndex: -1,
          }}
        />
      )}

      <Box display="flex" alignItems="center" justifyContent="center" height="90vh" sx={{ padding: "20px" }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            display: "flex",
            background: "rgba(0, 0, 0, 0.7)", // Better Contrast
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            overflow: "hidden",
            maxWidth: "900px",
            width: "100%",
            color: "white", // Ensure text is visible
          }}
        >
          {/* Movie Poster */}
          <Box width="40%">
            <img src={movie.image} alt={movie.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px 0 0 20px" }} />
          </Box>

          {/* Movie Details */}
          <Box width="60%" p={4} textAlign="left">
            <Typography variant="h3" fontWeight="bold">{movie.title}</Typography>
            <Typography variant="body1" sx={{ mt: 2, opacity: 0.9 }}>{movie.overview || "No description available."}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>🎭 Genre: {movie.genre}</Typography>
            <Typography variant="h6" sx={{ mt: 1, color: "#f4d03f" }}>⭐ Rating: {movie.rating}/10</Typography>
            <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold", color: "#ff4757" }}>💰 Price: ₹{movie.price || "Not Available"}</Typography>

            {/* Cart Success Message */}
            {cartMessage && <Typography variant="body1" sx={{ color: "lightgreen", mt: 2 }}>{cartMessage}</Typography>}

            {/* Buttons */}
            <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            {new Date(movie.release_date) <= new Date() && (
  <Button
    onClick={handleAddToCart}
    variant="contained"
    startIcon={<ShoppingCart />}
    sx={{
      backgroundColor: "#ff4757",
      "&:hover": { backgroundColor: "#e84118" },
      fontSize: "18px",
      padding: "12px 24px",
      borderRadius: "12px",
      fontWeight: "bold",
      color: "white",
    }}
  >
    Add to Cart
  </Button>
)}

              <Button
                onClick={() => navigate("/dashboard")}
                variant="outlined"
                startIcon={<Home />}
                sx={{
                  borderColor: "#ff4757",
                  color: "#ff4757",
                  "&:hover": { backgroundColor: "#ff4757", color: "white" },
                  fontSize: "18px",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  fontWeight: "bold",
                }}
              >
                Back to Dashboard
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </div>
  );
};

export default Moviedetail;
