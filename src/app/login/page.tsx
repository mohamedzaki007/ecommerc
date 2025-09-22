"use client";

import React from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-start bg-gray-100 min-h-[calc(100vh-65px)] pt-24 pb-8">
      <LoginForm />
    </div>
  );
}
