"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiShoppingCart, FiHeart, FiMenu, FiX, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "../ThemeToggle";
import Logo from "../common/Logo";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "Brands", href: "/brands" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <header className="bg-background text-foreground shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-16">
        <Logo />

        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map(item => (
            <Link key={item.name} href={item.href} className="hover:text-gray-600 dark:hover:text-gray-300 font-medium">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-700">Hi, {user?.name.split(" ")[0]}</span>
              <button onClick={logout} title="Logout" className="p-2 hover:text-red-500">
                <FiLogOut size={22} />
              </button>
            </>
          ) : (
            <>
              <Link href="/login" title="Login" className="p-2 hover:text-gray-600 dark:hover:text-gray-300">
                <FiLogIn size={22} />
              </Link>
              <Link href="/signup" title="Sign Up" className="p-2 hover:text-gray-600 dark:hover:text-gray-300">
                <FiUser size={22} />
              </Link>
            </>
          )}

          <Link href="/cart" className="relative p-2 hover:text-gray-600 dark:hover:text-gray-300">
            <FiShoppingCart size={24} />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1">{totalItems}</Badge>
            )}
          </Link>

          <Link href="/wishlist" className="relative p-2 hover:text-red-500">
            <FiHeart size={24} />
            {wishlist.length > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500">{wishlist.length}</Badge>
            )}
          </Link>
          <ThemeToggle />
        </div>

        <button onClick={toggleMobileMenu} className="md:hidden p-2">
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background shadow-md">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navItems.map(item => (
              <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-600 font-medium">
                {item.name}
              </Link>
            ))}

            <hr className="my-2 border-gray-200" />

            {isAuthenticated ? (
              <button
                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-2 hover:text-red-500 font-medium"
              >
                <FiLogOut /> Logout
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-300 font-medium">
                  <FiLogIn /> Login
                </Link>
                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-300 font-medium">
                  <FiUser /> Sign Up
                </Link>
              </>
            )}

            <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 relative hover:text-gray-600 dark:hover:text-gray-300 font-medium">
              <FiShoppingCart /> Cart
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1">{totalItems}</Badge>
              )}
            </Link>

            <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 relative hover:text-red-500 font-medium">
              <FiHeart /> Wishlist
              {wishlist.length > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500">{wishlist.length}</Badge>
              )}
            </Link>
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
