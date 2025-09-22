// src/components/slider-comp/CatSlider.tsx

import React from 'react';
// تأكد من المسار الصحيح للدالة
import { getCategories } from '@/app/actions/categories'; 
import CatSliderComp from './CatSliderComp'; 

// يجب أن تكون الدالة التي تستخدم await مُعرَّفة كـ "async function"
export default async function CatSlider() {
    let categoriesData = null;
    
    try {
        // ✅ الآن استخدام await صحيح لأنه داخل دالة async
        const response = await getCategories(); 
        
        // ... نفس منطق معالجة البيانات الذي ناقشناه سابقاً
        if (response && response.data) {
            categoriesData = response.data;
        }
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return <div className="text-center text-red-600 p-4">فشل تحميل التصنيفات.</div>;
    }

    if (!categoriesData || categoriesData.length === 0) {
        return null; 
    }

    return (
        <div className="py-8">
            <CatSliderComp categories={categoriesData}/>
        </div>
    );
}