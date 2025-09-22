"use client";

import { getWishlist, addToWishlist, removeFromWishlist } from '@/app/actions/wishlist.actions';
import { Product } from '@/app/taybs/product.model';
import { useSession } from 'next-auth/react';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isProductInWishlist: (productId: string) => boolean;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (session) {
        setLoading(true);
        const response = await getWishlist();
        if (response.success && Array.isArray(response.data)) {
          setWishlist(response.data);
        } else {
          setWishlist([]);
        }
        setLoading(false);
      } else {
        // If there is no session, stop loading and clear the wishlist
        setWishlist([]);
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [session]);

  const handleAddToWishlist = async (productId: string) => {
    const response = await addToWishlist(productId);
    if (response.success) {
      toast.success(response.message || "Product added to wishlist!");
      const updatedWishlist = await getWishlist();
      if (updatedWishlist.success) {
        setWishlist(updatedWishlist.data || []);
      }
    } else {
      toast.error(response.message || "Failed to add product.");
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    const response = await removeFromWishlist(productId);
    if (response.success) {
      toast.success(response.message || "Product removed from wishlist!");
      setWishlist(wishlist.filter(p => p._id !== productId));
    } else {
      toast.error(response.message || "Failed to remove product.");
    }
  };

  const isProductInWishlist = (productId: string) => {
    return wishlist.some(p => p._id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist: handleAddToWishlist, removeFromWishlist: handleRemoveFromWishlist, isProductInWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
