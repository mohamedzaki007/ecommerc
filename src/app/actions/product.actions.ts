// src/app/actions/products.ts

"use server"

import axios, { AxiosError } from 'axios';
import { ProductResponse } from '@/app/taybs/product.model';

export async function getProducts(): Promise<ProductResponse> {
    try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        return { 
            data: response?.data.data,
            status: response.status,
            message: response.data.message
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string }>;
            return {
                data: [],
                status: axiosError.response?.status,
                message: axiosError.response?.data?.message || "An error occurred during product fetch"
            }
        }
        return {
            data: [],
            status: 500,
            message: "An unknown error occurred"
        };
    }
}

export async function getProductsByCategory(categoryId: string): Promise<ProductResponse> {
    try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
            params: { category: categoryId }
        });
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
                message: axiosError.response?.data?.message || "An error occurred while fetching products for the category"
            };
        }
        return {
            data: [],
            status: 500,
            message: "An unknown error occurred"
        };
    }
}

export async function getProductsByBrand(brandId: string): Promise<ProductResponse> {
    try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
            params: { brand: brandId }
        });
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
                message: axiosError.response?.data?.message || "An error occurred while fetching products for the brand"
            };
        }
        return {
            data: [],
            status: 500,
            message: "An unknown error occurred"
        };
    }
}

export async function getProductById(id: string): Promise<ProductResponse> {
    try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        return { 
            data: response?.data.data,
            status: response.status,
            message: response.data.message
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string }>;
            return {
                data: null,
                status: axiosError.response?.status,
                message: axiosError.response?.data?.message || "An error occurred while fetching the product"
            };
        }
        return {
            data: null,
            status: 500,
            message: "An unknown error occurred"
        };
    }
}
