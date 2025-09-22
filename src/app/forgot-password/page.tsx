"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiMail } from 'react-icons/fi';
import InputField from '@/components/common/InputField';
import { forgotPassword } from '@/app/actions/auth.actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface ForgotPasswordInputs {
    email: string;
}

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInputs>();

    const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
        setIsLoading(true);
        const response = await forgotPassword(data.email);
        if (response.success) {
            toast.success(response.message || "Password reset code sent to your email.");
            router.push('/reset-password');
        } else {
            toast.error(response.message || "Failed to send reset code.");
        }
        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Forgot Your Password?</h2>
                <p className="text-center text-sm text-gray-600 mb-6">
                    Enter your email address and we'll send you a code to reset your password.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <InputField
                        id="email"
                        label="Email Address"
                        icon={FiMail}
                        type="email"
                        placeholder="example@domain.com"
                        {...register("email", {
                            required: "Email is required.",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address."
                            }
                        })}
                        error={errors.email?.message}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 disabled:opacity-50"
                    >
                        {isLoading ? "Sending..." : "Send Reset Code"}
                    </button>
                </form>
            </div>
        </div>
    );
}
