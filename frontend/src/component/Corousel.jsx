import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {
  const slides = [
    { id: 1, img: "https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg", title: "Avengers: Endgame" },
    { id: 2, img: "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg", title: "Interstellar" },
    { id: 3, img: "https://image.tmdb.org/t/p/w1280/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg", title: "Gravity" }
  ];

  return (
    <div className="w-full px-4"> {/* ✅ Full Width */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}  // ✅ No space between slides
        slidesPerView={1}  // ✅ Show 1 slide at a time
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full h-[700px] flex justify-center"> {/* ✅ Fixed Height */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover" // ✅ Full coverage without stretching
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
