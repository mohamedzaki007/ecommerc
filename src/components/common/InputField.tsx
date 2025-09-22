// src/components/common/InputField.tsx

import React from 'react';

// تعريف الـ Props (الخصائص) للمكون
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    icon: React.ElementType;
    error?: string; // رسالة الخطأ من React Hook Form
}

// استخدام React.forwardRef للسماح لـ React Hook Form بالتحكم في الحقل
const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    ({ id, label, icon: Icon, error, ...props }, ref) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                {/* الأيقونة داخل الحقل */}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    id={id}
                    ref={ref} // 💡 مهم لربط React Hook Form
                    className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none sm:text-sm ${
                        error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
                    }`}
                    {...props}
                />
            </div>
            {/* عرض رسالة الخطأ */}
            {error && <p className="mt-1 text-sm text-red-600 text-right">{error}</p>}
        </div>
    )
);

// يجب تعيين اسم العرض للمكون
InputField.displayName = 'InputField';

export default InputField;