"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiMapPin, FiPhone, FiHome, FiCheck } from "react-icons/fi";
import InputField from "@/components/common/InputField";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";

interface ShippingInputs {
  details: string;
  phone: string;
  city: string;
}

export default function ShippingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { cartItems } = useCart();
  const { data: session, status } = useSession();

  const { register, handleSubmit, formState: { errors } } = useForm<ShippingInputs>();

  // ----------------------------
  // حماية الصفحة: تحقق من الجلسة
  // ----------------------------
  useEffect(() => {
    if (status === "loading") return; // استنى لحد ما session يتحمل
    if (status === "unauthenticated") {
      toast.error("You must be logged in to proceed to checkout.");
      router.push("/auth/login");
    }
  }, [status, router]);

  // ----------------------------
  // إذا السلة فارغة
  // ----------------------------
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Browse Products
        </button>
      </div>
    );
  }

  // ----------------------------
  // عند إرسال البيانات
  // ----------------------------
  const onSubmit: SubmitHandler<ShippingInputs> = async (data) => {
    if (status !== "authenticated" || !session?.user?.token) {
      toast.error("You must be logged in to proceed.");
      router.push("/auth/login");
      return;
    }

    setIsLoading(true);

    try {
      // حفظ بيانات الشحن مؤقتًا في localStorage
      localStorage.setItem("shippingInfo", JSON.stringify(data));
      router.push("/checkout/payment"); // الانتقال لصفحة الدفع
    } catch (err) {
      toast.error("Error proceeding to payment.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-xl shadow-2xl space-y-5 max-w-lg mx-auto mt-10"
    >
      <InputField
        id="details"
        label="Address Details"
        icon={FiHome}
        type="text"
        placeholder="123 Main St, Apt 4B"
        {...register("details", { required: "Address details are required." })}
        error={errors.details?.message}
      />
      <InputField
        id="city"
        label="City"
        icon={FiMapPin}
        type="text"
        placeholder="Cairo / Alexandria"
        {...register("city", { required: "City is required." })}
        error={errors.city?.message}
      />
      <InputField
        id="phone"
        label="Phone Number"
        icon={FiPhone}
        type="tel"
        placeholder="01xxxxxxxxx"
        {...register("phone", { required: "Phone number is required." })}
        error={errors.phone?.message}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {isLoading ? "Processing..." : <><FiCheck className="inline mr-2" /> Continue</>}
      </button>
    </form>
  );
}
