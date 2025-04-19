'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const images = [
  '/images/little_castle_133809082549755585.jpg',
  '/images/penguin_133586736542609242.jpg',
  '/images/light_up_133589018324556924.jpg',
];

export default function ImageCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
      spaceBetween={10}
      slidesPerView={1}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            src={src}
            alt={`Wedding ${index + 1}`}
            className="w-full h-auto object-cover rounded-xl"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
