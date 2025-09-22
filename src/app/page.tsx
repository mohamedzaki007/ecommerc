// src/app/page.tsx

import { getProducts } from '@/app/actions/product.actions';
import { Product } from './taybs/product.model';

import Image from "next/image";
import MainSlider from "@/components/slider-comp/MainSlider";
import CatSlider from "@/components/slider-comp/CatSlider";
import ProductsGrid from "@/components/product-comp/ProductsGrid";
import CollectionGrid from "@/components/collection-grid/CollectionGrid";
import PromoBanners from "@/components/promo/PromoBanners";

export default async function Home() {
  const { data } = await getProducts();
  // Ensure products is always an array
  const products = Array.isArray(data) ? data : [];

  return (
    <>
      <MainSlider/>
      <CatSlider/>
      <CollectionGrid />
      <h1 className="text-3xl font-bold text-center mt-10">Products</h1>
      <ProductsGrid products={products} />
      <PromoBanners />
    </>
  );
}
