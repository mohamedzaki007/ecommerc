import { getProductsByBrand } from '@/app/actions/product.actions';
import ProductsGrid from '@/components/product-comp/ProductsGrid';
import { Product, ProductResponse } from '@/app/taybs/product.model';
import React from 'react';

export default async function BrandDetailsPage({ params }: { params: { id: string } }) {
  const { data: products }: ProductResponse = await getProductsByBrand(params.id);

  // Ensure products is an array before passing to the grid
  const productList = Array.isArray(products) ? products : [];

  return (
    <div className="container mx-auto p-4">
      <ProductsGrid products={productList} />
    </div>
  );
}
