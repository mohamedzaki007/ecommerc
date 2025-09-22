// src/app/order-success/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

export default function OrderSuccessPage() {
  const [orderTotal, setOrderTotal] = useState<number | null>(null);

  useEffect(() => {
    // جلب المبلغ الإجمالي من localStorage أو أي مكان خزنت فيه بعد الطلب
    const total = localStorage.getItem("orderTotal");
    if (total) setOrderTotal(parseFloat(total));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen pt-20 px-4 bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <FiCheckCircle className="text-green-600 w-20 h-20 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order is being processed.
        </p>

        {orderTotal !== null && (
          <p className="text-gray-700 font-semibold mb-6">
            Total Paid: ${orderTotal.toFixed(2)}
          </p>
        )}

        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
