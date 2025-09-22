import { getCategories } from '@/app/actions/categories';
import { Category } from '@/app/taybs/category.model';
import Link from 'next/link';
import React from 'react'

export default async function CategoriesPage() {
  const { data: categories }: { data: Category[] } = await getCategories();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link href={`/categories/${category._id}`} key={category._id}>
            <div className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-center">{category.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
