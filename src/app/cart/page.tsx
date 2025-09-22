// src/app/cart/page.tsx
"use client"; // مهم جدًا، لأننا هنستخدم useCart

import React from 'react';
import CartDetail from '@/components/cart/CartDetail';
import CheckoutCashOrder from '@/components/checkout/CheckoutCashOrder';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems, totalAmount } = useCart();

  return (
    <main className="pt-20 pb-10 max-w-5xl mx-auto px-4">
      
      {/* مكون تفاصيل السلة */}
      <CartDetail />

      {/* إجمالي السلة */}
      {cartItems.length > 0 && (
        <div className="mt-4 text-right font-semibold text-lg">
          Total: ${totalAmount.toFixed(2)}
        </div>
      )}

      {/* زر الدفع النقدي */}
      <div className="mt-8 text-center">
        <CheckoutCashOrder />
      </div>

      {/* رسالة إذا كانت السلة فارغة */}
      {cartItems.length === 0 && (
        <p className="mt-6 text-center text-gray-500">
          Your cart is empty.
        </p>
      )}
    </main>
  );
}
