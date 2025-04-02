import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Movies from "../component/Movies";
import Corousel from "../component/Corousel";
import Footer from "../component/Footer";
import { fetchUser } from "../api/userApi";
import { fetchMovies } from "../api/movieApi";
import { localStorageUtils } from "../utils/localStorageUtils"; 
import { LocalStorageKeys } from "../constants/enums";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../component/Loader";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
        localStorageUtils.setItem(LocalStorageKeys.USERNAME, userData.username);
        localStorageUtils.setItem(LocalStorageKeys.USER_ROLE, userData.role);
        localStorageUtils.setItem(LocalStorageKeys.USER_ID, userData.userId);
      } catch (error) {
        toast.error("User session expired! Redirecting...");
        navigate("/login");
      }
    };

    const getMovies = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
      } catch (error) {
        toast.error("Error fetching movies! ");
      } finally {
        setLoading(false);
      }
    };

    getUser();
    getMovies();
  }, [navigate]);

  if (loading) return <Loader />;
  if (!user) return <h1 className="text-center mt-10 text-red-500"> Error: User data not found</h1>;

  const today = new Date().toISOString().split("T")[0];
  const upcomingMovies = movies.filter(movie => movie.release_date > today);

  return (
    <div>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Corousel />
      <Movies />
      
      {/* Upcoming Movies Section */}
      {upcomingMovies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-6 max-w-[1600px] mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6 text-left text-gray-800">🎬 Upcoming Movies</h2>

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
            {upcomingMovies.map((movie) => (
              <SwiperSlide key={movie._id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-4 rounded-lg shadow-lg cursor-pointer"
                  onClick={() => navigate(`/movies/${movie._id}`)}
                >
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-[500px] object-cover rounded-lg transition-opacity hover:opacity-90"
                  />
                  <h3 className="text-xl font-semibold mt-3 text-center text-gray-800">{movie.title}</h3>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;
