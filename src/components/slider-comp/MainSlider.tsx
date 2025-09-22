"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

const slidesData = [
  {
    imgSrc: "/slider/banner2.jpg",
    title: "Summer Collection",
    subtitle: "40% off on all summer products.",
    buttonText: "Shop Now",
    buttonLink: "/products",
  },
  {
    imgSrc: "/slider/banner1.jpg",
    title: "New Arrivals",
    subtitle: "Check out the latest trends.",
    buttonText: "Explore Now",
    buttonLink: "/products",
  },
];

export default function MainSlider() {
  return (
    <div className='main-slider-container'>
      <Swiper
        spaceBetween={0}
        effect={'slide'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="hero-swiper"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
              <Image
                src={slide.imgSrc}
                alt={slide.title}
                fill={true}
                priority={index === 0}
                className="slide-image"
                sizes="(max-width: 1200px) 100vw, 100vw"
              />
              <div className="text-overlay">
                <h1 className="title">{slide.title}</h1>
                <p className="subtitle">{slide.subtitle}</p>
                <Link href={slide.buttonLink} className="cta-button">
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-swiper {
          width: 100%;
          height: 80vh;
          min-height: 500px;
          overflow: hidden;
        }
        .swiper-slide {
          position: relative;
        }
        .slide-image {
          object-fit: cover;
          z-index: 1;
        }
        .text-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background-color: rgba(0, 0, 0, 0.3);
          color: white;
          direction: rtl;
        }
        .title {
          font-size: 3.5rem;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .cta-button {
          margin-top: 1.5rem;
          padding: 12px 28px;
          background-color: rgba(255, 255, 255, 0.1);
          border: 2px solid white;
          color: white;
          text-decoration: none;
          font-weight: 600;
          border-radius: 50px;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }
        .cta-button:hover {
          background-color: white;
          color: black;
        }
        .swiper-button-next, .swiper-button-prev {
            color: white !important;
            --swiper-navigation-size: 30px;
        }
      `}</style>
    </div>
  );
}
