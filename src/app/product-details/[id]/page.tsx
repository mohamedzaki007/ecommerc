// src/app/product/[id]/page.tsx

import React from 'react';
import { getProductById, getProductsByCategory } from '@/app/actions/product.actions';
import ProductDetail from '@/components/product-comp/ProductDetail';
import { Product } from '@/app/taybs/product.model';

interface ProductPageProps {
    params: {
        id: string; // قيمة ID المنتج من الرابط
    };
}

// Server Component لجلب بيانات المنتج
export default async function ProductPage({ params }: ProductPageProps) {
    const productId = params.id;
    
    try {
        const productResponse = await getProductById(productId);
        const productData = productResponse?.data;

        if (!productData || Array.isArray(productData)) {
            // Handle case where product is not found or data is in wrong format
            return (
                <main className="text-center p-20">
                    <h1 className="text-3xl text-gray-700">المنتج المطلوب غير متوفر حاليًا.</h1>
                </main>
            );
        }

        let relatedProducts: Product[] = [];
        try {
            const relatedProductsResponse = await getProductsByCategory(productData.category._id);
            if (relatedProductsResponse.data && Array.isArray(relatedProductsResponse.data)) {
                relatedProducts = relatedProductsResponse.data;
            }
        } catch (relatedError) {
            console.error(`Failed to fetch related products for category ${productData.category._id}:`, relatedError);
            // Continue without related products if the fetch fails
        }

        return (
            <main className="min-h-screen pt-16">
                <ProductDetail product={productData} relatedProducts={relatedProducts} />
            </main>
        );

    } catch (error) {
        console.error(`Failed to fetch product ${productId}:`, error);
        return (
            <main className="text-center p-20">
                <h1 className="text-3xl text-red-600">عذراً، لم نتمكن من العثور على المنتج.</h1>
            </main>
        );
    }

}

// ----------------------------------------------------------------------
// 🚨 ملاحظة: يجب عليك إنشاء دالة getProductById في ملف actions/product.actions.ts
// ----------------------------------------------------------------------
