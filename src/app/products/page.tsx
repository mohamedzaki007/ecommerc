// src/app/products/page.tsx

import React from 'react';
// استيراد دالة جلب المنتجات
import { getProducts } from '@/app/actions/product.actions';
import ProductsGrid from "@/components/product-comp/ProductsGrid";
import { Product } from '../taybs/product.model';

export default async function ProductsPage() {
    const result = await getProducts();
    const products: Product[] = Array.isArray(result.data) ? result.data : [];

    if (products.length === 0) {
        return (
            <main className="text-center p-16">
                <h1 className="text-4xl font-bold mb-4">No products available.</h1>
                <p>Please check your API connection.</p>
            </main>
        );
    }

    return (
        <main className="p-4 pt-20">
            <h1 className="text-4xl font-bold text-center mb-10">All Products</h1>
            <ProductsGrid products={products} />
        </main>
    );
}
