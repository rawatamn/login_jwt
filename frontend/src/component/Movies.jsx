import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MoviesCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // Get token from storage

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/movies", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovies(response.data); // ✅ Set movies data
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-6 max-w-[1600px] mx-auto"> {/* ✅ Increased max width */}
      <h2 className="text-3xl font-bold mb-6 text-left text-gray-800">Recommended Movies</h2>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={4} // ✅ Now shows 4 movies at a time
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 }, // ✅ 2 movies on small screens
            1024: { slidesPerView: 3 }, // ✅ 3 movies on medium screens
            1280: { slidesPerView: 5 }  // ✅ 4 movies on large screens
          }}
          className="pb-6"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie._id}>
              <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[500px] object-cover rounded-lg transition-opacity duration-300 hover:opacity-90"
                />
                <h3 className="text-xl font-semibold mt-3 text-center text-gray-800">{movie.title}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MoviesCarousel;
