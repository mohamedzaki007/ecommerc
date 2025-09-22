import { getBrands } from '@/app/actions/brand.actions';
import { Category } from '@/app/taybs/category.model';
import Link from 'next/link';
import React from 'react'

export default async function BrandsPage() {
  const { data: brands } = await getBrands();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link href={`/brands/${brand._id}`} key={brand._id}>
            <div className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <img src={brand.image} alt={brand.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-center">{brand.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
