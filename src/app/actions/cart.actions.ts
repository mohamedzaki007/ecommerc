// src/app/actions/cart.actions.ts

"use server";

import axios, { AxiosError } from "axios";

const CART_API_URL = "https://ecommerce.routemisr.com/api/v1/cart";
const ORDER_API_URL = "https://ecommerce.routemisr.com/api/v1/orders";

export async function addToCart(productId: string, token: string) {
  try {
    const response = await axios.post(
      CART_API_URL,
      { productId },
      { headers: { "Content-Type": "application/json", token } }
    );
    return { success: true, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.error("Error adding product to server cart:", axiosError.response?.data);
    return { success: false, error: axiosError.response?.data?.message || "Failed to add item to cart." };
  }
}

export async function getCart(token: string) {
  try {
    const response = await axios.get(CART_API_URL, { headers: { token } });
    return { success: true, data: response.data.data };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.error("Error fetching cart data:", axiosError.response?.data);
    return { success: false, error: axiosError.response?.data?.message || "Failed to fetch cart." };
  }
}

export async function removeFromCart(productId: string, token: string) {
  try {
    const response = await axios.delete(`${CART_API_URL}/${productId}`, { headers: { token } });
    return { success: true, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.error("Error removing product from server cart:", axiosError.response?.data);
    return { success: false, error: axiosError.response?.data?.message || "Failed to remove item from cart." };
  }
}

export async function updateCartItemQuantity(productId: string, count: number, token: string) {
  try {
    const response = await axios.put(
      `${CART_API_URL}/${productId}`,
      { count },
      { headers: { "Content-Type": "application/json", token } }
    );
    return { success: true, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.error("Error updating cart item quantity:", axiosError.response?.data);
    return { success: false, error: axiosError.response?.data?.message || "Failed to update item quantity." };
  }
}

export async function createCashOrder(
  orderData: { cartItems: { productId: string; quantity: number }[]; shippingAddress: { street: string; city: string; phone: string } },
  token: string
) {
  try {
    const response = await axios.post(
      ORDER_API_URL,
      {
        cartItems: orderData.cartItems,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: "cash",
      },
      { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
    );

    return { success: true, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.error("Error creating cash order:", axiosError.response?.data);
    return { success: false, error: axiosError.response?.data?.message || "Failed to create cash order." };
  }
}
