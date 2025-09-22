"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import InputField from '@/components/common/InputField';
import Link from 'next/link';

interface SignupFormInputs {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
}

export default function SignupForm() {
    const { signup } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError
    } = useForm<SignupFormInputs>();

    const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
        setIsLoading(true);
        setMessage(null);

        if (data.password !== data.rePassword) {
            setError("rePassword", { type: "manual", message: "Passwords do not match." });
            setIsLoading(false);
            return;
        }

        const result = await signup(data);

        if (result.success) {
            setMessage({ type: 'success', text: result.message || "Signup successful! You will be redirected shortly." });
        } else {
            setMessage({ type: 'error', text: result.message || "Signup failed. Please check your details." });
        }
        setIsLoading(false);
    };

    return (
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Create an account</h2>

            {message && (
                <div className={`p-3 mb-4 rounded-lg text-sm font-medium ${
                    message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputField
                    id="name"
                    label="Full Name"
                    icon={FiUser}
                    type="text"
                    placeholder="Ahmed Abd El-Muti"
                    {...register("name", {
                        required: "Full name is required.",
                        minLength: { value: 3, message: "Name must be at least 3 characters." }
                    })}
                    error={errors.name?.message}
                />
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
                <InputField
                    id="rePassword"
                    label="Confirm Password"
                    icon={FiLock}
                    type="password"
                    placeholder="********"
                    {...register("rePassword", {
                        required: "Please confirm your password.",
                        validate: (value) => value === watch('password') || "Passwords do not match."
                    })}
                    error={errors.rePassword?.message}
                />
                <InputField
                    id="phone"
                    label="Phone Number"
                    icon={FiPhone}
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    {...register("phone", {
                        required: "Phone number is required.",
                        pattern: {
                            value: /^01[0-2,5]{1}[0-9]{8}$/i,
                            message: "Invalid phone number format."
                        }
                    })}
                    error={errors.phone?.message}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 disabled:opacity-50"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Signing Up...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account? <Link href="/login" className="font-medium text-gray-900 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">Log In</Link>
            </p>
        </div>
    );
}
