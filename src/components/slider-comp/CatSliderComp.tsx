"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import { Category as CategoryType } from '@/app/taybs/category.model';

import 'swiper/css';
import 'swiper/css/navigation';

interface CatSliderProps {
    categories: CategoryType[];
}

export default function CatSliderComp({ categories }: CatSliderProps) {
  return (
    <div className='cat-slider-wrapper mx-auto max-w-7xl px-4'>
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">Categories</h2>

      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="category-swiper"
        breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 20, },
            768: { slidesPerView: 4, spaceBetween: 30, },
            1024: { slidesPerView: 6, spaceBetween: 40, },
        }}
      >
        {categories.map((cat) => (
            <SwiperSlide key={cat._id}>
                <Link href={`/categories/${cat._id}`} className="category-card group">
                    <div className="category-icon-box">
                        <Image
                            src={cat.image}
                            alt={cat.name}
                            width={100}
                            height={100}
                            className="category-image"
                        />
                    </div>
                    <p className="category-name text-gray-800 dark:text-gray-200 group-hover:text-orange-500 transition-colors">{cat.name}</p>
                </Link>
            </SwiperSlide>
        ))}
      </Swiper>
      
      <style jsx global>{`
          .category-swiper {
            padding: 30px 0;
            width: 100%;
            user-select: none;
          }
          .category-card {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              text-decoration: none;
              transition: transform 0.3s;
          }
          .category-card:hover {
              transform: translateY(-5px); 
          }
          .category-icon-box {
              width: 100px; 
              height: 100px;
              border-radius: 50%;
              overflow: hidden;
              margin-bottom: 8px;
              border: 2px solid #ff5722;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .category-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
          }
          .category-name {
              font-weight: 600;
              font-size: 1.1em;
              margin-top: 5px;
          }
          .category-swiper .swiper-button-next,
          .category-swiper .swiper-button-prev {
              color: #555 !important; 
              top: 50%; 
              transform: translateY(-50%);
          }
      `}</style>
    </div>
  );
}
