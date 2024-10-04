"use client";
import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { useAPI } from "../hooks/useAPI";
import {
  CartItem,
  Order,
  OrderDelivery,
  OrderedItem,
  PaymentMethod,
  Status,
} from "@gstore/core";

export interface ContextPaymentProps {
  paymentMethod: PaymentMethod;
  delivery: Partial<OrderDelivery>;
  alterPaymentMethod: (paymentMethod: PaymentMethod) => void;
  alterDelivery: (delivery: Partial<OrderDelivery>) => void;
  finalizePurchase: () => void;
}

const ContextPayment = createContext<ContextPaymentProps>({} as any);

export const ProviderPayment = (props: any) => {
  const { httpPost } = useAPI();
  const { items, totalValue, clearCart } = useCart();
  const { saveItem, getItem } = useLocalStorage();
  const router = useRouter();

  const [paymentMethod, setpaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.PIX
  );
  const [delivery, setDelivery] = useState<Partial<OrderDelivery>>({});

  const alterPaymentMethod = (paymentMethod: PaymentMethod) => {
    saveItem("paymentMethod", paymentMethod);
    setpaymentMethod(paymentMethod);
  };

  const alterDelivery = (delivery: Partial<OrderDelivery>) => {
    saveItem("delivery", delivery);
    setDelivery(delivery);
  };

  const finalizePurchase = async () => {
    const order: Partial<Order> = {
      date: new Date(),
      paymentMethod,
      totalValue,
      delivery: delivery as OrderDelivery,
      status: Status.RECEIVED,
      items: items.map(
        (item: CartItem) =>
          ({
            product: item.product,
            quantity: item.quantity,
            unitPrice: item.product.promotionalPrice,
          }) as OrderedItem
      ),
    };

    await httpPost("/orders", order);
    clearCart();
    router.push("/checkout/sucess");
  };

  useEffect(() => {
    const delivery = getItem("delivery");
    const paymentMethod = getItem("paymentMethod");
    if (delivery) setDelivery(delivery);
    if (paymentMethod) setpaymentMethod(paymentMethod);
  }, [getItem]);

  return (
    <ContextPayment.Provider
      value={{
        delivery,
        paymentMethod,
        alterDelivery,
        alterPaymentMethod,
        finalizePurchase,
      }}
    >
      {props.children}
    </ContextPayment.Provider>
  );
};

export default ContextPayment;
