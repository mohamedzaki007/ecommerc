"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function CardPaymentPage() {
  const router = useRouter();
  const { cartItems, totalAmount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <button
          onClick={() => router.push("/products")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Browse Products
        </button>
      </div>
    );
  }

  const handleCardPayment = () => {
    if (!cardNumber || !expiry || !cvv) {
      toast.error("Please fill all card details.");
      return;
    }

    setLoading(true);
    localStorage.setItem("orderTotal", totalAmount.toString());
    clearCart();

    toast.success("Payment successful!");
    setTimeout(() => {
      router.push("/order-success");
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Card Payment</h1>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="Expiry MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <button
          onClick={handleCardPayment}
          disabled={loading}
          className="py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}
