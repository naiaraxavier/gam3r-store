import {
  CalculateInstallment,
  Cart,
  CartItem,
  Installment,
  Product,
} from "@gstore/core";
import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export interface ContextoCarrinhoProps {
  itens: CartItem[];
  qtdeItens: number;
  valorTotalCheio: number;
  valorTotal: number;
  parcelamento: Installment;
  adicionarItem: (produto: Product) => void;
  removerItem: (produto: Product) => void;
  removerProduto: (produto: Product) => void;
  limparCarrinho: () => void;
}

const ContextoCarrinho = createContext<ContextoCarrinhoProps>({} as any);

export function ProvedorCarrinho(props: any) {
  const { salvarItem, obterItem } = useLocalStorage();
  const [carrinho, setCarrinho] = useState<Cart>(new Cart());

  function adicionarItem(produto: Product) {
    alterarCarrinho(carrinho.addItem(produto));
  }

  function removerItem(produto: Product) {
    alterarCarrinho(carrinho.removeItem(produto));
  }

  function removerProduto(produto: Product) {
    alterarCarrinho(carrinho.removeProduct(produto));
  }

  function limparCarrinho() {
    alterarCarrinho(carrinho.clear());
  }

  function alterarCarrinho(carrinho: Cart) {
    salvarItem("carrinho", carrinho.items);
    setCarrinho(carrinho);
  }

  useEffect(() => {
    obterItem("carrinho").then((itensSalvos: CartItem[]) => {
      if (itensSalvos) setCarrinho(new Cart(itensSalvos));
    });
  }, [obterItem]);

  return (
    <ContextoCarrinho.Provider
      value={{
        itens: carrinho.items,
        qtdeItens: carrinho.qtItems,
        valorTotal: carrinho.totalValue,
        valorTotalCheio: carrinho.totalValueFull,
        parcelamento: new CalculateInstallment().execute(carrinho.totalValue),
        adicionarItem,
        removerItem,
        removerProduto,
        limparCarrinho,
      }}
    >
      {props.children}
    </ContextoCarrinho.Provider>
  );
}

export default ContextoCarrinho;
