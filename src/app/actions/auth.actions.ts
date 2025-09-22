"use server";

import axios, { AxiosError } from 'axios';

const API_BASE_URL = "https://ecommerce.routemisr.com/api/v1/auth";

interface User {
    name: string;
    email: string;
    role: string;
}

const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        return { success: false, message: axiosError.response?.data?.message || "An unexpected error occurred." };
    }
    return { success: false, message: "An unknown error occurred." };
};

export async function login(formData: { [key: string]: string }): Promise<{ success: boolean; token?: string; user?: User; message?: string }> {
    try {
        const response = await axios.post(`${API_BASE_URL}/signin`, {
            email: formData.email,
            password: formData.password
        });
        return {
            success: true,
            token: response.data.token,
            user: response.data.user
        };
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        return {
            success: false,
            message: axiosError.response?.data?.message || "Login failed. Please check your credentials."
        };
    }
}

export async function forgotPassword(email: string) {
    try {
        const response = await axios.post(`${API_BASE_URL}/forgotPasswords`, { email });
        return { success: true, message: response.data.message };
    } catch (error) {
        return handleApiError(error);
    }
}

export async function verifyResetCode(resetCode: string) {
    try {
        const response = await axios.post(`${API_BASE_URL}/verifyResetCode`, { resetCode });
        return { success: true, message: response.data.status };
    } catch (error) {
        return handleApiError(error);
    }
}

export async function resetPassword(email: string, newPassword: string) {
    try {
        const response = await axios.put(`${API_BASE_URL}/resetPassword`, { email, newPassword });
        return { success: true, token: response.data.token };
    } catch (error) {
        return handleApiError(error);
    }
}
