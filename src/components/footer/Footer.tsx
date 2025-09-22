import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiTruck, FiShield, FiAward, FiTag, FiGift, FiFacebook, FiTwitter, FiYoutube, FiInstagram } from 'react-icons/fi';
import Logo from '../common/Logo';

const features = [
    { icon: <FiTruck size={24} />, title: 'Free delivery', description: 'Lorem ipsum dolor sit amet, consectetur adipi elit.' },
    { icon: <FiShield size={24} />, title: '100% secure payment', description: 'Lorem ipsum dolor sit amet, consectetur adipi elit.' },
    { icon: <FiAward size={24} />, title: 'Quality guarantee', description: 'Lorem ipsum dolor sit amet, consectetur adipi elit.' },
    { icon: <FiTag size={24} />, title: 'Guaranteed savings', description: 'Lorem ipsum dolor sit amet, consectetur adipi elit.' },
    { icon: <FiGift size={24} />, title: 'Daily offers', description: 'Lorem ipsum dolor sit amet, consectetur adipi elit.' },
];

const footerLinks = {
    ultras: [
        { name: 'About us', href: '/about' },
        { name: 'Conditions', href: '#' },
        { name: 'Our Journals', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Affiliate Programme', href: '#' },
        { name: 'Ultras Press', href: '#' },
    ],
    customerService: [
        { name: 'FAQ', href: '#' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Returns & Refunds', href: '#' },
        { name: 'Cookie Guidelines', href: '#' },
        { name: 'Delivery Information', href: '#' },
    ],
};

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 border-b border-gray-200 dark:border-gray-700">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-4">
                            <div className="flex-shrink-0 text-gray-800 dark:text-gray-200">{feature.icon}</div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                                <p className="text-sm mt-1">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-4">
                        <Logo />
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="hover:text-gray-900 dark:hover:text-white"><FiFacebook size={20} /></a>
                            <a href="#" className="hover:text-gray-900 dark:hover:text-white"><FiTwitter size={20} /></a>
                            <a href="#" className="hover:text-gray-900 dark:hover:text-white"><FiYoutube size={20} /></a>
                            <a href="#" className="hover:text-gray-900 dark:hover:text-white"><FiInstagram size={20} /></a>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Ultras</h3>
                        <ul className="mt-4 space-y-2">
                            {footerLinks.ultras.map(link => (
                                <li key={link.name}><Link href={link.href} className="hover:text-gray-900 dark:hover:text-white text-sm">{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Customer Service</h3>
                        <ul className="mt-4 space-y-2">
                            {footerLinks.customerService.map(link => (
                                <li key={link.name}><Link href={link.href} className="hover:text-gray-900 dark:hover:text-white text-sm">{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Subscribe Us</h3>
                        <p className="mt-4 text-sm">Subscribe to our newsletter to get updates about our grand offers.</p>
                        <form className="mt-4 flex">
                            <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500" />
                            <button type="submit" className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-r-md hover:bg-gray-900">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="py-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center text-sm">
                    <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Zaki Store. All rights reserved.</p>
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                        <Image src="/images/31.jpg" alt="Payment Method 1" width={38} height={24} className="object-contain"/>
                        <Image src="/images/32.png" alt="Payment Method 2" width={38} height={24} className="object-contain"/>
                        <Image src="/images/33.jpg" alt="Payment Method 3" width={38} height={24} className="object-contain"/>
                    </div>
                    <p className="mt-4 sm:mt-0 text-center sm:text-right">
                        Designed by Eng. Mohamed Zaki 2025
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
