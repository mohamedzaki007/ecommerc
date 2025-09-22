"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiCheckCircle } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

export default function OrderConfirmPage() {
  const router = useRouter();
  const { cartItems, totalAmount, clearCart } = useCart();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  // جلب بيانات الدفع والشحن من localStorage بعد التحميل على المتصفح
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pm = localStorage.getItem("paymentMethod");
      const siStr = localStorage.getItem("shippingInfo");
      if (!pm || !siStr) {
        router.push("/checkout/details");
        return;
      }
      setPaymentMethod(pm);
      setShippingInfo(siStr ? JSON.parse(siStr) : null);
    }
  }, [router]);

  if (!paymentMethod || !shippingInfo) {
    return null; // منع عرض الصفحة قبل وجود البيانات
  }

  const handleContinue = () => {
    // تفريغ السلة ومسح بيانات الدفع والشحن
    clearCart();
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("shippingInfo");
    router.push("/"); // التحويل للصفحة الرئيسية
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 px-4 bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <FiCheckCircle className="text-green-600 w-20 h-20 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>

        <p className="text-gray-600 mb-6">
          {paymentMethod === "cash"
            ? "You chose Cash on Delivery. Your order will be delivered soon."
            : "Your card payment was successful. Your order is being processed."}
        </p>

        {/* عرض ملخص المنتجات قبل تفريغ السلة */}
        {cartItems.length > 0 && (
          <div className="text-left mb-6 bg-gray-100 p-4 rounded-lg max-h-64 overflow-y-auto">
            <h2 className="font-semibold mb-2">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.title} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-2 border-t pt-2">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* معلومات الشحن */}
        {shippingInfo && (
          <div className="text-left mb-6 bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Shipping Information</h2>
            <p>{shippingInfo.name}</p>
            <p>{shippingInfo.email}</p>
            <p>{shippingInfo.phone}</p>
            <p>{shippingInfo.address}, {shippingInfo.city}</p>
            <p>{shippingInfo.zip}, {shippingInfo.country}</p>
          </div>
        )}

        <button
          onClick={handleContinue}
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
