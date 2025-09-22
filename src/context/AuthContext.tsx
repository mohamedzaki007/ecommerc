"use client";

import React, { createContext, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

interface UserData {
    name: string;
    email: string;
}

interface SignupData {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
}

interface AuthContextType {
    user: UserData | null;
    isAuthenticated: boolean;
    login: (formData: Record<string, unknown>) => Promise<Record<string, unknown>>;
    logout: () => void;
    signup: (formData: SignupData) => Promise<{ success: boolean; message: string; }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const SIGNUP_API = "https://ecommerce.routemisr.com/api/v1/auth/signup";

    const isAuthenticated = status === 'authenticated';
    const user = session?.user as UserData || null;

    const login = async (_formData: Record<string, unknown>) => {
        return { success: false, message: "Use NextAuth signIn function directly." };
    };

    const logout = () => {
        signOut({ redirect: true, callbackUrl: '/login' });
    };

    const signup = async (formData: SignupData) => {
        try {
            await axios.post(SIGNUP_API, formData);
            router.push('/login?signupSuccess=true');
            return { success: true, message: "Signup successful! You can now log in." };
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            return {
                success: false,
                message: axiosError.response?.data?.message || "Signup failed."
            };
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
