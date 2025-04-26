'use client';

import Image from 'next/image';
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
        loop
        spaceBetween={10}
        slidesPerView={1}
        className="w-full h-full" // ← ここは"継承ベース"にしておく
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-0 pb-[43.75%] rounded-xl overflow-hidden"> {/* 16:7 の比率 */}
              <Image
                src={src}
                alt={`Wedding ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  
//         <SwiperSlide key={index} className="w-full">
//         <div className="relative aspect-[16/9] w-full">
//           <Image
//             src={src}
//             alt={`Wedding ${index + 1}`}
//             fill //  これがポイント！親要素のサイズに合わせる
//             className="object-cover rounded-xl"
//             priority={index === 0} // 最初の画像はプリロード（LCP対策）
//             sizes="(max-width: 768px) 100vw, 768px"
//           />
// </div>
// </SwiperSlide>
