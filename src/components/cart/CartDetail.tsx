// src/components/cart/CartDetail.tsx

"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
// 💡 استيراد مكونات الجدول من Shadcn/ui (يجب أن يكون المسار صحيحاً)
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; 

// ... (بقية الكود)

export default function CartDetail() {
    const { cartItems, removeItem, addItem, totalAmount, clearCart } = useCart();
    
    // ... (منطق السلة فارغة) ...

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold mb-8">Shopping Cart</h1>
            
            <div className="flex flex-col lg:flex-row gap-10">
                
                {/* 1. قائمة المنتجات (العمود الأيسر) - سيتم عرضها كجدول */}
                <div className="lg:w-8/12 space-y-4">
                    
                    {/* 🚨 هنا نستخدم مكون الجدول Shadcn/ui 🚨 */}
                    <Table>
                        <TableCaption>A list of all items currently in your cart.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Product</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="w-[120px]">Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">Subtotal</TableHead>
                                <TableHead className="text-center">Remove</TableHead>
                            </TableRow>
                        </TableHeader>
                        
                        <TableBody>
                            {/* 💡 التكرار على العناصر الحقيقية في السلة */}
                            {cartItems.map((item) => (
                                <TableRow key={item.id}>
                                    
                                    <TableCell className="font-medium">
                                        <div className="relative w-16 h-16 rounded-md overflow-hidden">
                                            <Image src={item.imageCover} alt={item.title} fill style={{ objectFit: 'cover' }} />
                                        </div>
                                    </TableCell>
                                    
                                    <TableCell>
                                        <Link href={`/product-details/${item.id}`} className="hover:text-indigo-600 font-medium">
                                            {item.title}
                                        </Link>
                                    </TableCell>
                                    
                                    <TableCell>
                                        <div className="flex items-center">
                                            <button onClick={() => removeItem(item.id)} className="p-1 border rounded-md hover:bg-gray-100"><FiMinus size={14} /></button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button onClick={() => addItem(item)} className="p-1 border rounded-md hover:bg-gray-100"><FiPlus size={14} /></button>
                                        </div>
                                    </TableCell>
                                    
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                    
                                    <TableCell className="text-right font-bold">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </TableCell>
                                    
                                    <TableCell className="text-center">
                                        <button onClick={() => clearCart(item.id)} className="text-red-500 hover:text-red-700">
                                            <FiTrash2 size={20} />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <button 
                        onClick={clearCart}
                        className="text-red-500 hover:text-red-700 text-sm font-medium mt-4 p-2 border border-red-300 rounded-lg transition"
                    >
                        Clear All Items
                    </button>
                </div>

                {/* 2. ملخص الطلب (العمود الأيمن) */}
                {/* ... (كود ملخص الطلب) ... */}
            </div>
        </div>
    );
}