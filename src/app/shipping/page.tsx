// src/app/checkout/shipping/page.tsx
"use client";

import React from "react";
import ShippingForm from "@/components/checkout/ShippingForm";

export default function ShippingPage() {
  return (
    <main className="pt-20 pb-10 max-w-xl mx-auto px-4">
      <ShippingForm />
    </main>
  );
}
