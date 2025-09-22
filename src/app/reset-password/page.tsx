"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiLock, FiCheckCircle, FiMail } from 'react-icons/fi';
import InputField from '@/components/common/InputField';
import { verifyResetCode, resetPassword } from '@/app/actions/auth.actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface ResetPasswordInputs {
    email: string;
    resetCode: string;
    newPassword: string;
}

export default function ResetPasswordPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordInputs>();

    const handleVerifyCode: SubmitHandler<{ resetCode: string }> = async (data) => {
        setIsLoading(true);
        const response = await verifyResetCode(data.resetCode);
        if (response.success) {
            toast.success("Code verified successfully!");
            setIsCodeVerified(true);
        } else {
            toast.error(response.message || "Invalid or expired reset code.");
        }
        setIsLoading(false);
    };

    const handleResetPassword: SubmitHandler<ResetPasswordInputs> = async (data) => {
        setIsLoading(true);
        const response = await resetPassword(data.email, data.newPassword);
        if (response.success) {
            toast.success("Password has been reset successfully. Please log in.");
            router.push('/login');
        } else {
            toast.error("Failed to reset password.");
        }
        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Reset Your Password</h2>
                
                {!isCodeVerified ? (
                    <form onSubmit={handleSubmit(handleVerifyCode)} className="space-y-4">
                        <p className="text-center text-sm text-gray-600 mb-4">
                            Enter the reset code sent to your email.
                        </p>
                        <InputField
                            id="resetCode"
                            label="Reset Code"
                            icon={FiCheckCircle}
                            type="text"
                            placeholder="123456"
                            {...register("resetCode", { required: "Reset code is required." })}
                            error={errors.resetCode?.message}
                        />
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 disabled:opacity-50">
                            {isLoading ? "Verifying..." : "Verify Code"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-4">
                        <p className="text-center text-sm text-gray-600 mb-4">
                            Enter your email and new password.
                        </p>
                        <InputField
                            id="email"
                            label="Email Address"
                            icon={FiMail}
                            type="email"
                            placeholder="example@domain.com"
                            {...register("email", { required: "Email is required." })}
                            error={errors.email?.message}
                        />
                        <InputField
                            id="newPassword"
                            label="New Password"
                            icon={FiLock}
                            type="password"
                            placeholder="********"
                            {...register("newPassword", { required: "New password is required.", minLength: { value: 6, message: "Password must be at least 6 characters." } })}
                            error={errors.newPassword?.message}
                        />
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 disabled:opacity-50">
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
