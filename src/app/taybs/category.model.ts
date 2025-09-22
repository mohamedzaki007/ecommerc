export interface Category { // 💡 يفضل تسمية الواجهة بالمفرد (Category)
    
    // الخصائص الأساسية والمستخدمة في العرض
    _id: string;        // المعرف الرئيسي من MongoDB
    id: string;         // عادةً ما يتم تكرار _id في حقل id لتسهيل استخدام React
    name: string;
    slug: string;
    image: string;      // رابط الصورة (URL)

    // خصائص إضافية (يمكن حذفها إذا لم تستخدم)
    createdAt: string;
    updatedAt: string;
}