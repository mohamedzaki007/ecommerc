"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

interface ShippingInputs {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

export default function ShippingFormPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ShippingInputs>();

  // لو المستخدم مسجل، نملأ البيانات تلقائيًا
  useEffect(() => {
    if (session?.user) {
      setValue("name", session.user.name || "");
      setValue("email", session.user.email || "");
    }
  }, [session, setValue]);

  // إذا مش مسجل دخول، نطلب منه تسجيل الدخول
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("You must be logged in to proceed to checkout.");
      router.push("/auth/login"); // صفحة تسجيل الدخول
    }
  }, [status, router]);

  if (cartItems.length === 0) {
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

  const onSubmit: SubmitHandler<ShippingInputs> = (data) => {
    setLoading(true);
    // حفظ البيانات في localStorage مؤقتًا أو Context
    localStorage.setItem("shippingInfo", JSON.stringify(data));
    router.push("/checkout/payment"); // التوجه لصفحة اختيار طريقة الدفع
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-8 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Shipping Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: "Name is required" })}
          className="w-full p-3 border rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-3 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="tel"
          placeholder="Phone Number"
          {...register("phone", { required: "Phone is required" })}
          className="w-full p-3 border rounded"
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: "Address is required" })}
          className="w-full p-3 border rounded"
        />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}

        <input
          type="text"
          placeholder="City"
          {...register("city", { required: "City is required" })}
          className="w-full p-3 border rounded"
        />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}

        <input
          type="text"
          placeholder="ZIP / Postal Code"
          {...register("zip", { required: "ZIP is required" })}
          className="w-full p-3 border rounded"
        />
        {errors.zip && <p className="text-red-500">{errors.zip.message}</p>}

        <input
          type="text"
          placeholder="Country"
          {...register("country", { required: "Country is required" })}
          className="w-full p-3 border rounded"
        />
        {errors.country && <p className="text-red-500">{errors.country.message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Processing..." : "Continue to Payment"}
        </button>
      </form>
    </div>
  );
}
