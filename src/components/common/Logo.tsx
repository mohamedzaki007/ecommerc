import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href="/" className="inline-block">
      <h1 className="font-playfair-display text-3xl font-bold tracking-wider">
        <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
          Zaki
        </span>
        <span className="bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent">
          Store
        </span>
      </h1>
    </Link>
  );
};

export default Logo;
