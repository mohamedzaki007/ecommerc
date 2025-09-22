import Link from 'next/link';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

interface CollectionCardProps {
    title: string;
    description?: string;
    category: string;
    href: string;
    large?: boolean;
    bgColor: string;
    textColor: string;
}

const CollectionCard = ({ title, description, category, href, large = false, bgColor, textColor }: CollectionCardProps) => (
    <Link href={href} className={`group ${large ? 'md:col-span-2 md:row-span-2' : ''}`}>
        <div
            className={`relative rounded-lg overflow-hidden h-full p-8 flex flex-col justify-center transition-all duration-300 hover:scale-105 ${bgColor}`}
            style={{ minHeight: large ? '524px' : '250px' }}
        >
            <div className={`absolute inset-0 ${bgColor} opacity-90`} />
            <div className={`relative z-10 ${textColor}`}>
                <p className="text-sm font-semibold uppercase tracking-widest">{category}</p>
                <h3 className="text-3xl md:text-4xl font-bold mt-2">{title}</h3>
                {large && <p className="mt-4 max-w-xs">{description}</p>}
                <div className="inline-flex items-center mt-6 font-semibold text-lg">
                    Shop Collection <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </div>
    </Link>
);

export default function CollectionGrid() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CollectionCard
                    large
                    category="Casual Collection"
                    title="Street Wear."
                    description="Comfortable and stylish outfits for your everyday look."
                    href="/products"
                    bgColor="bg-gray-800 dark:bg-gray-200"
                    textColor="text-white dark:text-black"
                />
                <CollectionCard
                    category="Basic Collection"
                    title="Basic Shoes."
                    href="/categories"
                    bgColor="bg-gray-200 dark:bg-gray-700"
                    textColor="text-black dark:text-white"
                />
                <CollectionCard
                    category="Best Selling Product"
                    title="Woolen Hat."
                    href="/products"
                    bgColor="bg-gray-800 dark:bg-gray-200"
                    textColor="text-white dark:text-black"
                />
            </div>
        </section>
    );
}
