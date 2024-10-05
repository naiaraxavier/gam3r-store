import { Coin, Installment } from "@gstore/core";
import { IconCreditCard } from "@tabler/icons-react";

export interface SummaryPaymentProps {
  qtItems: number;
  totalValue: number;
  totalValueFull: number;
  installment: Installment;
  finalizePurchase: () => void;
  className?: string;
}

export const SummaryPayment = ({
  totalValue,
  totalValueFull,
  installment,
  finalizePurchase,
  className,
}: SummaryPaymentProps) => {
  return (
    <div
      className={`
                flex flex-col self-start gap-3 
                w-96 px-6 py-8
                bg-violet-dark rounded-xl
                ${className ?? ""}
              `}
    >
      <span className="text-xl font-semibold">Resumo:</span>
      <div className="flex justify-between">
        <span className="text-zinc-400">Forma de Pagamento:</span>
        <span>PIX/Boleto</span>
      </div>
      <div className="flex justify-between">
        <span className="text-zinc-400">Valor Total:</span>
        <span className="text-emerald-500 font-semibold">
          {Coin.formate(totalValueFull)}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-zinc-400">Desconto:</span>
        <span className="text-red-500 font-semibold">
          -{Coin.formate(totalValueFull - totalValue)}
        </span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-zinc-400">à vista no PIX/Boleto</span>
        <span className="text-emerald-500 font-semibold text-2xl">
          {Coin.formate(totalValue ?? 0)}
        </span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-sm text-zinc-300 mt-2">
          installment no Cartão
        </span>
        <div className="text-sm text-zinc-300">
          em até{" "}
          <span className="text-white font-semibold">
            {installment.installmentQuantity}x
          </span>{" "}
          de{" "}
          <span className="text-white font-semibold">
            {Coin.formate(installment.installmentValue)}
          </span>
        </div>
      </div>
      <button onClick={finalizePurchase} className="button bg-indigo-700 mt-7">
        <IconCreditCard size={20} />
        <span>Finalizar Compra</span>
      </button>
    </div>
  );
};
