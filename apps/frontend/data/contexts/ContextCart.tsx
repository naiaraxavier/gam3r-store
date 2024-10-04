"use client";
import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  CalculateInstallment,
  Cart,
  CartItem,
  Installment,
  Product,
} from "@gstore/core";

export interface ContextCartProps {
  items: CartItem[];
  qtdeItems: number;
  totalValueFull: number;
  totalValue: number;
  installment: Installment;
  addItem: (product: Product) => void;
  removeItem: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearCart: () => void;
}

const ContextCart = createContext<ContextCartProps>({} as any);

export const ProviderCart = (props: any) => {
  const { saveItem, getItem } = useLocalStorage();
  const [cart, setCart] = useState<Cart>(new Cart());

  const addItem = (product: Product) => {
    alterCart(cart.addItem(product));
  };

  const removeItem = (product: Product) => {
    alterCart(cart.removeItem(product));
  };

  const removeProduct = (product: Product) => {
    alterCart(cart.removeProduct(product));
  };

  const clearCart = () => {
    alterCart(cart.clear());
  };

  const alterCart = (cart: Cart) => {
    saveItem("cart", cart.items);
    setCart(cart);
  };

  useEffect(() => {
    const itemsSalvos: CartItem[] = getItem("cart");
    if (itemsSalvos) setCart(new Cart(itemsSalvos));
  }, [getItem]);

  return (
    <ContextCart.Provider
      value={{
        items: cart.items,
        qtdeItems: cart.qtdeItems,
        totalValue: cart.totalValue,
        totalValueFull: cart.totalValueFull,
        installment: new CalculateInstallment().execute(cart.totalValue),
        addItem,
        removeItem,
        removeProduct,
        clearCart,
      }}
    >
      {props.children}
    </ContextCart.Provider>
  );
};

export default ContextCart;
