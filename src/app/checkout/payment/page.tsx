"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();

  const shippingInfo = typeof window !== "undefined" ? localStorage.getItem("shippingInfo") : null;

  useEffect(() => {
    if (!shippingInfo) {
      router.push("/checkout/details"); // لو بيانات الشحن مش موجودة
    }
  }, [shippingInfo, router]);

  const handleCash = () => {
    // تخزين نوع الدفع
    localStorage.setItem("paymentMethod", "cash");
    router.push("/checkout/confirm"); // صفحة الشكر بعد الدفع الكاش
  };

  const handleCard = () => {
    localStorage.setItem("paymentMethod", "card");
    router.push("/checkout/confirm"); // ممكن نضيف صفحة ادخال معلومات بطاقة وهمية هنا
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h2 className="text-3xl font-bold mb-6">Choose Payment Method</h2>
      <div className="flex gap-4">
        <button
          onClick={handleCash}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Cash on Delivery
        </button>
        <button
          onClick={handleCard}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Credit / Debit Card
        </button>
      </div>
    </div>
  );
}
