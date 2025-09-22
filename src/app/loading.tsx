// src/app/loading.tsx

import React from 'react';
// استيراد أيقونة التحميل (يمكنك اختيار FiLoader أو FiRefreshCw)
import { FiLoader } from 'react-icons/fi'; 

// هذا المكون يظهر تلقائياً كشاشة تحميل
export default function Loading() {
  return (
    // استخدام كلاسات Tailwind لتثبيت الموقع وتوسيطه
    <div className="fixed inset-0 bg-background/90 flex justify-center items-center z-[9999] backdrop-blur-sm">
      
      <div className="flex flex-col items-center p-8 bg-background rounded-xl shadow-2xl border">
        
        {/* أيقونة التحميل الدوارة */}
        <FiLoader 
          size={50} 
          className="text-gray-900 dark:text-gray-100 animate-spin"
        />
        
        {/* نص التحميل */}
        <p className="mt-4 text-gray-900 dark:text-gray-100 text-lg font-semibold">
          Content is loading...
        </p>
      </div>
    </div>
  );
}
