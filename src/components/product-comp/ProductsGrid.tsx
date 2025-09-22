"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Product as ProductType } from "@/app/taybs/product.model";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProductsGridProps {
  products: ProductType[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center p-8 text-xl text-gray-500">
        No products currently available.
      </div>
    );
  }

  return (
    <section
      className="products-grid-section px-4 py-12 overflow-hidden"
      style={{ maxWidth: "1400px", margin: "0 auto" }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Best Selling Products</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: ProductType;
}

function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isProductInWishlist } = useWishlist();
  const { data: session } = useSession();
  const router = useRouter();

  const isInWishlist = isProductInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
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

  const productLink = `/product-details/${product.id}`;
  const price = product.price;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Adding product:", product);

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      imageCover: product.imageCover,
    });
  };

  return (
    <div
      className="product-card-item border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 relative bg-white shadow-md hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={productLink} passHref>
        <div className="image-container relative w-full aspect-square cursor-pointer">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
            className="transition-transform duration-500 hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div
        className={`hover-overlay absolute inset-x-0 bottom-1/3 flex flex-col items-center justify-center transition-opacity duration-300 ${
          isHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="hover-box bg-white shadow-xl p-2 rounded-lg flex items-center justify-center space-x-4 transform -translate-y-4">
          <button
            type="button"
            className="add-to-cart-btn px-4 py-2 text-sm font-semibold bg-gray-900 text-white rounded-md transition-colors hover:bg-gray-700"
            onClick={handleAddToCart}
          >
            <FiShoppingCart className="inline mr-1" size={16} />
            Add To Cart
          </button>

          <button
            className={`icon-btn p-2 rounded-full transition-all ${
              isInWishlist
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white"
            }`}
            onClick={handleWishlistClick}
          >
            {isInWishlist ? <FaHeart size={18} /> : <FiHeart size={18} />}
          </button>
        </div>
      </div>

      <div className="p-4 text-left">
        <h3 className="text-lg font-medium mb-1 truncate">{product.title}</h3>
        <p className="text-gray-700 font-semibold text-xl">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}
