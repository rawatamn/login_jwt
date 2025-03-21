import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchMovies } from "../api/movieApi"; // ✅ Import centralized API function

const MoviesCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(); // ✅ Fetch movies via API function
        setMovies(data);
      } catch (error) {
        console.error("❌ Error loading movies:", error);
      }
      setLoading(false);
    };

    loadMovies();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="p-6 max-w-[1600px] mx-auto"
    >
      {/* 🎬 Animated Heading */}
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-3xl font-bold mb-6 text-left text-gray-800"
      >
        Recommended Movies
      </motion.h2>

      {loading ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-lg text-gray-600"
        >
          🔄 Loading...
        </motion.p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
          }}
          className="pb-6"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie._id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
                className="bg-white p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform"
                onClick={() => navigate(`/movies/${movie._id}`)}
              >
                {/* 🎬 Movie Poster with Hover Effect */}
                <motion.img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[500px] object-cover rounded-lg transition-opacity duration-300 hover:opacity-90"
                  whileHover={{ scale: 1.02 }}
                />

                {/* 🎥 Movie Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-xl font-semibold mt-3 text-center text-gray-800"
                >
                  {movie.title}
                </motion.h3>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </motion.div>
  );
};

export default MoviesCarousel;
