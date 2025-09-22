"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiMail, FiLock } from 'react-icons/fi';
import InputField from '@/components/common/InputField';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface LoginFormInputs {
    email: string;
    password: string;
}

export default function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setIsLoading(true);
        setMessage(null);

        const result = await signIn('credentials', {
            ...data,
            redirect: false,
        });

        if (result?.error) {
            setMessage({ type: 'error', text: "Invalid email or password. Please try again." });
        } else {
            setMessage({ type: 'success', text: "Login successful!" });
            router.push('/');
        }
        setIsLoading(false);
    };

    return (
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Login to your account</h2>

            {message && (
                <div className={`p-3 mb-4 rounded-lg text-sm font-medium ${
                    message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                    {message.text}
                </div>
            )}

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

                <InputField
                    id="password"
                    label="Password"
                    icon={FiLock}
                    type="password"
                    placeholder="********"
                    {...register("password", {
                        required: "Password is required.",
                        minLength: { value: 6, message: "Password must be at least 6 characters." }
                    })}
                    error={errors.password?.message}
                />

                <div className="text-right text-sm">
                    <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 disabled:opacity-50"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>

            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account? <Link href="/signup" className="font-medium text-gray-900 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">Sign Up</Link>
            </p>
        </div>
    );
}
