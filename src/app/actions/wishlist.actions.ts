"use server"

import axios, { AxiosError } from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

const API_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

async function getAuthHeader() {
    const session = await getServerSession(authOptions);
    const token = session?.user?.token;
    if (!token) {
        throw new Error("User is not authenticated.");
    }
    return { headers: { token } };
}

export async function getWishlist() {
    try {
        const config = await getAuthHeader();
        const response = await axios.get(API_URL, config);
        return { success: true, data: response.data.data };
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        return { success: false, message: axiosError.response?.data?.message || "Failed to fetch wishlist." };
    }
}

export async function addToWishlist(productId: string) {
    try {
        const config = await getAuthHeader();
        const response = await axios.post(API_URL, { productId }, config);
        return { success: true, message: response.data.message, data: response.data.data };
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        return { success: false, message: axiosError.response?.data?.message || "Failed to add to wishlist." };
    }
}

export async function removeFromWishlist(productId: string) {
    try {
        const config = await getAuthHeader();
        const response = await axios.delete(`${API_URL}/${productId}`, config);
        return { success: true, message: response.data.message, data: response.data.data };
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        return { success: false, message: axiosError.response?.data?.message || "Failed to remove from wishlist." };
    }
}
