"use client";

import React, { useEffect } from 'react';
import { useWishlist } from '@/context/WishlistContext';
import ProductsGrid from '@/components/product-comp/ProductsGrid';
import { FiLoader } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function WishlistPage() {
  const { wishlist, loading } = useWishlist();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiLoader className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  if (status === 'authenticated') {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">My Wishlist</h1>
        {wishlist.length > 0 ? (
          <ProductsGrid products={wishlist} />
        ) : (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
    );
  }

  return null; // Render nothing while redirecting
}
