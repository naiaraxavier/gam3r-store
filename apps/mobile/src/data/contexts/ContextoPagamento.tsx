import {
  PaymentMethod,
  OrderedItem,
  Order,
  OrderDelivery,
  Status,
} from "@gstore/core";
import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useCarrinho from "../hooks/useCarrinho";
import useAPI from "../hooks/useAPI";

export interface ContextoPagamentoProps {
  formaPagamento: PaymentMethod;
  entrega: Partial<OrderDelivery>;
  alterarFormaPagamento: (formaPagamento: PaymentMethod) => void;
  alterarEntrega: (entrega: Partial<OrderDelivery>) => void;
  finalizarCompra: () => void;
}

const ContextoPagamento = createContext<ContextoPagamentoProps>({} as any);

export function ProvedorPagamento(props: any) {
  const { httpPost } = useAPI();
  const { itens, valorTotal, limparCarrinho } = useCarrinho(); // Certifique-se de que valorTotal esteja definido aqui
  const { salvarItem, obterItem } = useLocalStorage();

  const [formaPagamento, setFormaPagamento] = useState<PaymentMethod>(
    PaymentMethod.PIX
  );
  const [entrega, setEntrega] = useState<Partial<OrderDelivery>>({});

  function alterarFormaPagamento(formaPagamento: PaymentMethod) {
    salvarItem("formaPagamento", formaPagamento);
    setFormaPagamento(formaPagamento);
  }

  function alterarEntrega(entrega: Partial<OrderDelivery>) {
    salvarItem("entrega", entrega);
    setEntrega(entrega);
  }

  async function finalizarCompra() {
    const pedido: Partial<Order> = {
      date: new Date(),
      paymentMethod: formaPagamento,
      totalValue: valorTotal,
      delivery: entrega as OrderDelivery,
      status: Status.RECEIVED,
      items: itens.map(
        (item) =>
          ({
            product: item.product,
            quantity: item.quantity,
            unitPrice: item.product.promotionalPrice,
          }) as OrderedItem
      ),
    };

    await httpPost("/orders", pedido);
    limparCarrinho();
  }

  useEffect(() => {
    obterItem("entrega").then((entrega) => {
      setEntrega(entrega ?? {});
    });
    obterItem("formaPagamento").then((formaPagamento) => {
      setFormaPagamento(formaPagamento ?? PaymentMethod.PIX);
    });
  }, [obterItem]);

  return (
    <ContextoPagamento.Provider
      value={{
        entrega,
        formaPagamento,
        alterarEntrega,
        alterarFormaPagamento,
        finalizarCompra,
      }}
    >
      {props.children}
    </ContextoPagamento.Provider>
  );
}

export default ContextoPagamento;
