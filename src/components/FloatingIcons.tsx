"use client";

import React, { useState, useEffect } from 'react';
import { FiPhone, FiMessageSquare, FiArrowUp } from 'react-icons/fi';

export default function FloatingIcons() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-center gap-3 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          aria-label="Back to top"
        >
          <FiArrowUp size={24} />
        </button>
      )}
      <a
        href="https://wa.me/YOUR_WHATSAPP_NUMBER"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <FiMessageSquare size={24} />
      </a>
      <a
        href="tel:YOUR_PHONE_NUMBER"
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        aria-label="Call us"
      >
        <FiPhone size={24} />
      </a>
    </div>
  );
}
