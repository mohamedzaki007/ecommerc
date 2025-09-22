// src/app/products/page.tsx

import React from 'react';
// استيراد دالة جلب المنتجات
import { getProducts } from '@/app/actions/product.actions'; 
// استيراد مكون الشبكة الذي يعرض المنتجات
import ProductsGrid from "@/components/product-comp/ProductsGrid"; 

// هذا المكون Server Component لأنه يجلب البيانات
export default async function ProductsPage() {

    // 1. جلب البيانات باستخدام دالة getProducts
    const { data: products } = await getProducts();
    
    // 2. يمكنك إضافة شرط للتحقق من فشل الجلب
    if (!products || products.length === 0) {
        return (
            <main className="text-center p-16">
                <h1 className="text-4xl font-bold mb-4">No products available.</h1>
                <p>Please check your API connection.</p>
            </main>
        );
    }

    // 3. عرض المنتجات باستخدام نفس المكون
    return (
        <main className="p-4 pt-20"> {/* إضافة padding علوي ليكون أسفل الـ Navbar */}
            <h1 className="text-4xl font-bold text-center mb-10">All Products</h1>
            
            {/* استخدام نفس المكون لعرض الشبكة */}
            <ProductsGrid products={products} />
        </main>
    );
}