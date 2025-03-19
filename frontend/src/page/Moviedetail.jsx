import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/Navbar";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { ShoppingCart, Home } from "lucide-react";
import { CartContext } from "../context/CartContext"; // ✅ Import CartContext

const Moviedetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  // ✅ Get cart functions from Context
  const { cart, setCart, addToCart } = useContext(CartContext);

  useEffect(() => {
    console.log("🔍 Movie ID from URL:", id);

    const fetchMovie = async () => {
      try {
        if (!id) throw new Error("Movie ID is undefined.");

        const response = await axios.get(`http://localhost:7000/api/movies/${id}`);
        console.log("🟢 Movie Data Fetched:", response.data);
        setMovie(response.data);
      } catch (error) {
        console.error("❌ Error fetching movie:", error);
        setError(error.response?.data?.message || "Failed to fetch movie");
      }
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  // ✅ Handle Add to Cart using Context API
  const handleAddToCart = () => {
    if (movie) {
      addToCart(movie); // ✅ Use `addToCart` from context
      setCartMessage("Movie added to cart successfully!");
      setTimeout(() => setCartMessage(""), 3000); // Clear message after 3 sec
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
        ❌ {error}
      </Typography>
    );

  return (
    <div>
      <Navbar />

      {/* Background with Blur */}
      {movie.image && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${movie.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(10px) brightness(50%)",
            zIndex: -1,
          }}
        />
      )}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="90vh"
        sx={{ color: "white", textAlign: "center", padding: "20px" }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            display: "flex",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            overflow: "hidden",
            maxWidth: "900px",
            width: "100%",
          }}
        >
          {/* Movie Poster */}
          <Box width="40%">
            <img
              src={movie.image}
              alt={movie.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px 0 0 20px",
              }}
            />
          </Box>

          {/* Movie Details */}
          <Box width="60%" p={4} textAlign="left">
            <Typography variant="h3" fontWeight="bold">
              {movie.title}
            </Typography>

            <Typography variant="body1" sx={{ mt: 2, opacity: 0.9 }}>
              {movie.overview || "No description available."}
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Genre: {movie.genre}
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, color: "gold" }}>
              ⭐ Rating: {movie.rating}/10
            </Typography>

            <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold", color: "#ff4757" }}>
              Price: ₹{movie.price ? movie.price : "Not Available"}
            </Typography>

            {/* Cart Success Message */}
            {cartMessage && (
              <Typography variant="body1" sx={{ color: "green", mt: 2 }}>
                ✅ {cartMessage}
              </Typography>
            )}

            {/* Buttons */}
            <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
              {/* Add to Cart Button */}
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
                }}
              >
                Add to Cart
              </Button>

              {/* Back to Dashboard Button */}
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
