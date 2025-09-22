"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CheckoutCashOrder() {
  const { cartItems } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleGoToCheckout = () => {
    if (status === "loading") return; // انتظر تحميل الجلسة

    // التحقق من تسجيل الدخول
    if (status === "unauthenticated" || !session?.user?.token) {
      toast.error("You must be logged in to proceed.");
      // توجيه المستخدم إلى صفحة تسجيل الدخول الصحيحة
      router.push("/login");
      return;
    }

    // التحقق من السلة
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    // التوجيه لصفحة Shipping Details
    router.push("/checkout/details");
  };

  return (
    <button
      onClick={handleGoToCheckout}
      disabled={cartItems.length === 0 || status === "loading"}
      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all disabled:opacity-50"
    >
      Proceed to Checkout
    </button>
  );
}
