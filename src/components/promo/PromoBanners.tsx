import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const PromoBanner = ({ title, subtitle, buttonText, href, bgColor, textColor }: { title: string, subtitle: string, buttonText: string, href: string, bgColor: string, textColor: string }) => {
    return (
        <Link href={href} className="group">
            <div className={`relative overflow-hidden h-64 rounded-lg p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 ${bgColor}`}>
                <div className={`relative z-10 ${textColor}`}>
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <p className="mt-2 text-sm">{subtitle}</p>
                    <Button variant="outline" className="mt-4 bg-transparent border-current text-current hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white">
                        {buttonText}
                    </Button>
                </div>
            </div>
        </Link>
    );
};

export default function PromoBanners() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PromoBanner
                    title="New Season Arrivals"
                    subtitle="Check out all the new trends"
                    buttonText="Shop Now"
                    href="/products"
                    bgColor="bg-gray-200 dark:bg-gray-700"
                    textColor="text-black dark:text-white"
                />
                <PromoBanner
                    title="Sale Up to 40% Off"
                    subtitle="Don't miss our exclusive deals"
                    buttonText="Explore Deals"
                    href="/products"
                    bgColor="bg-gray-800 dark:bg-gray-200"
                    textColor="text-white dark:text-black"
                />
            </div>
        </section>
    );
}
