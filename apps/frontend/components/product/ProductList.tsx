"use client";

import { products } from "@gstore/core";
// import useProdutos from '@/data/hooks/useProdutos'
import { ProductItem } from "./ProductItem";
import { ProductNotFound } from "./ProductNotFound";

export const ProductList = () => {
  // const { produtos } = useProdutos()
  return products.length ? (
    <div
      className="
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5
      "
    >
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  ) : (
    <ProductNotFound withoutBackButton />
  );
};
