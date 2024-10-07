import { createContext, useCallback, useEffect, useState } from "react";
import { FilterProducts, Product } from "@gstore/core";
import useAPI from "../hooks/useAPI";

export interface ContextoProdutosProps {
  produtos: Product[];
  pesquisa: string;
  setPesquisa: (pesquisa: string) => void;
  produtoPorId: (id: number) => Product | null;
}

const ContextoProdutos = createContext<ContextoProdutosProps>({} as any);

export function ProvedorProdutos(props: any) {
  const { httpGet } = useAPI();
  const [pesquisa, setPesquisa] = useState<string>("");
  const [produtos, setProdutos] = useState<Product[]>([]);

  const carregarProdutos = useCallback(async () => {
    const produtos = await httpGet("/products");
    setProdutos(Array.isArray(produtos) ? produtos : []);
  }, [httpGet]);

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  return (
    <ContextoProdutos.Provider
      value={{
        pesquisa,
        get produtos() {
          if (!pesquisa) return produtos;
          return new FilterProducts().execute(pesquisa, produtos);
        },
        setPesquisa,
        produtoPorId: (id: number) =>
          produtos.find((produto) => produto.id === id) ?? null,
      }}
    >
      {props.children}
    </ContextoProdutos.Provider>
  );
}

export default ContextoProdutos;
