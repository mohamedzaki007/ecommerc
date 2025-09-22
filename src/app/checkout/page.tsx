"use client";

import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import CheckoutCashOrder from "@/components/checkout/CheckoutCashOrder";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cartItems, totalAmount } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  // التحقق من تسجيل الدخول والسلة الفارغة
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("You must be logged in to proceed to checkout.");
      router.push("/auth/login");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty.");
      router.push("/products");
      return;
    }
  }, [status, cartItems, router]);

  // لو البيانات مش جاهزة بعد
  if (status === "loading" || !cartItems) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* قائمة عناصر السلة */}
        <div className="lg:w-2/3 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Items</h2>
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center py-4">
                <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                  <Image
                    src={item.imageCover}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="font-semibold">${item.price.toFixed(2)}</p>
                </div>
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* إجمالي السلة */}
          <div className="mt-6 flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold">${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* قسم الدفع */}
        <div className="lg:w-1/3 bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold mb-4">Payment</h2>

          {/* زر الدفع النقدي */}
          <CheckoutCashOrder />

          {/* يمكنك إضافة طرق دفع أخرى هنا مستقبلًا */}
        </div>
      </div>
    </div>
  );
}
