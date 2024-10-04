"use client";
import { useAPI } from "../hooks/useAPI";
import { FilterProducts, Product } from "@gstore/core";
import { createContext, useCallback, useEffect, useState } from "react";

export interface ContextoProdutosProps {
  search: string;
  products: Product[];
  setsearch: (search: string) => void;
  productById: (id: number) => Product | null;
}

const ContextProducts = createContext<ContextoProdutosProps>({} as any);

export const ProviderProducts = (props: any) => {
  const { httpGet } = useAPI();
  const [search, setsearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = useCallback(async () => {
    const products = await httpGet("/products");
    setProducts(products ?? []);
  }, [httpGet]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <ContextProducts.Provider
      value={{
        search,
        get products() {
          if (!search) return products;
          return new FilterProducts().execute(search, products);
        },
        setsearch,
        productById: (id: number) =>
          products.find((product) => product.id === id) ?? null,
      }}
    >
      {props.children}
    </ContextProducts.Provider>
  );
};

export default ContextProducts;
