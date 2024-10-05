"use client";
import { SelectionPaymentMethod } from "@/components/checkout/payment/SelectionPaymentMethod";
import { SummaryPayment } from "@/components/checkout/payment/SummaryPayment";
import { FormDelivery } from "@/components/checkout/payment/FormDelivery";
import { HeaderCheckout } from "@/components/checkout/HeaderCheckout";
import usePayment from "@/data/hooks/usePayment";
import useCart from "@/data/hooks/useCart";

const PagePayment = () => {
  const { installment, qtItems, totalValue, totalValueFull } = useCart();
  const {
    delivery,
    paymentMethod,
    alterDelivery,
    alterPaymentMethod,
    finalizePurchase,
  } = usePayment();

  return (
    <div className="flex flex-col gap-7 container">
      <HeaderCheckout step="Pagamento" />
      <div className="flex gap-5">
        <div className="flex-1 flex flex-col gap-5">
          <SelectionPaymentMethod
            paymentMethod={paymentMethod}
            paymentMethodChanged={alterPaymentMethod}
          />
          <FormDelivery delivery={delivery} deliveryChanged={alterDelivery} />
        </div>
        <SummaryPayment
          qtItems={qtItems}
          totalValue={totalValue}
          totalValueFull={totalValueFull}
          installment={installment}
          finalizePurchase={finalizePurchase}
          className="mt-12"
        />
      </div>
    </div>
  );
};

export default PagePayment;
