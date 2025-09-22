"use server";

import axios, { AxiosError } from 'axios';

async function getCategories() {
    try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        return {
            data: response?.data.data,
            status: response.status,
            message: response.data.message
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string }>;
            return {
                data: [],
                status: axiosError.response?.status,
                message: axiosError.response?.data?.message || "An error occurred during fetch"
            };
        }
        return {
            data: [],
            status: 500,
            message: "An unknown error occurred"
        };
    }
}

export { getCategories };
