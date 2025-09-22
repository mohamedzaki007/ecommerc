import { getProductsByCategory } from '@/app/actions/product.actions';
import ProductsGrid from '@/components/product-comp/ProductsGrid';
import { Product, ProductResponse } from '@/app/taybs/product.model';
import React from 'react';

export default async function CategoryDetailsPage({ params }: { params: { id: string } }) {
  const { data: products }: ProductResponse = await getProductsByCategory(params.id);

  // Ensure products is an array before passing to the grid
  const productList = Array.isArray(products) ? products : [];

  return (
    <div className="container mx-auto p-4">
      <ProductsGrid products={productList} />
    </div>
  );
}
