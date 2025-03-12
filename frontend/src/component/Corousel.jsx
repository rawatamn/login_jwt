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
    { id: 3, img: "https://image.tmdb.org/t/p/w1280/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg", title: "The last of us" }
  ];

  return (
    <div className="w-full px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[700px] flex justify-center">
              {/* Movie Image */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Movie Title Overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 text-center">
                <h2 className="text-white text-3xl font-bold drop-shadow-lg">
                  {slide.title}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
