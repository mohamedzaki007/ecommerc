"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Product as ProductType } from "@/app/taybs/product.model";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ProductsGrid from "./ProductsGrid";

interface ProductDetailProps {
  product: ProductType;
  relatedProducts: ProductType[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isProductInWishlist } = useWishlist();
  const { data: session } = useSession();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const isInWishlist = isProductInWishlist(product.id);

  const handleWishlistClick = () => {
    if (!session) {
      router.push('/login');
      return;
    }
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = () => {
    // إضافة المنتج للكمية المختارة
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        imageCover: product.imageCover,
      });
    }
    toast.success(`${quantity} × ${product.title} added to cart`);
    console.log(`Added ${quantity} of ${product.title} to cart.`);
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Image Slider */}
          <div className="lg:w-7/12">
            <Swiper
              modules={[Navigation, Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              navigation
              className="main-swiper rounded-lg shadow-lg"
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <Image src={img} alt={`${product.title} ${index + 1}`} width={800} height={800} className="w-full h-full object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              watchSlidesProgress
              className="thumbs-swiper mt-4"
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index} className="cursor-pointer rounded-md overflow-hidden border-2 border-transparent hover:border-indigo-500">
                  <Image src={img} alt={`thumb ${index + 1}`} width={100} height={100} className="w-full h-full object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Details */}
          <div className="lg:w-5/12 pt-6 lg:pt-0">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">{product.title}</h1>
            <p className="text-3xl text-gray-800 dark:text-gray-200 font-bold mb-6">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{product.description}</p>

            <div className="flex items-center space-x-4 mb-8">
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 text-lg bg-gray-100 hover:bg-gray-200">-</button>
                <span className="p-3 w-12 text-center border-x border-gray-300">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-3 text-lg bg-gray-100 hover:bg-gray-200">+</button>
              </div>
              <button onClick={handleAddToCart} className="flex-grow p-4 bg-gray-900 text-white rounded-lg font-semibold text-lg transition-all hover:bg-gray-700 shadow-xl flex items-center justify-center">
                <FiShoppingCart className="inline mr-2" size={24} /> Add To Cart
              </button>
              <button onClick={handleWishlistClick} className={`p-4 rounded-lg transition-all ${isInWishlist ? 'bg-red-500 text-white' : 'border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'}`}>
                {isInWishlist ? <FaHeart size={24} /> : <FiHeart size={24} />}
              </button>
            </div>
            <p className={`text-sm font-medium ${product.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.quantity > 0 ? `Available: ${product.quantity} in stock` : "Sold out"}
            </p>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold text-center mb-8">Related Products</h2>
        <ProductsGrid products={relatedProducts.filter(p => p.id !== product.id)} />
      </div>
    </div>
  );
}
