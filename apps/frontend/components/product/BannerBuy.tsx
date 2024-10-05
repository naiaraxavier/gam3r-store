"use client";
import { IconCreditCard, IconShoppingCart } from "@tabler/icons-react";
import { useInstallment } from "@/data/hooks/useInstallment";
import { useRouter } from "next/navigation";
import { Coin, Product } from "@gstore/core";
import useCart from "@/data/hooks/useCart";

export interface BannerBuyProps {
  product: Product;
}

export const BannerBuy = ({ product }: BannerBuyProps) => {
  const router = useRouter();
  const { addItem } = useCart();
  const installment = useInstallment(product.promotionalPrice);

  return (
    <div className="flex">
      <div className="flex flex-col border-r border-zinc-500 pr-5">
        <div className="line-through text-zinc-400">
          de {Coin.formate(product?.basePrice)}
        </div>
        <div className="text-2xl font-semibold">
          <span className="text-base text-zinc-300">por</span>{" "}
          <span className="text-emerald-500">
            {Coin.formate(product?.promotionalPrice)}
          </span>{" "}
          <span className="text-base text-zinc-300">à vista</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col text-2xl font-semibold text-zinc-400 pl-5">
        <span className="text-base text-zinc-300">
          {installment.installmentQuantity}x de
        </span>
        {Coin.formate(installment.installmentValue)}{" "}
      </div>
      <div className="flex gap-2 items-center">
        <button
          className="flex-1 button bg-pink-600"
          onClick={() => addItem(product)}
        >
          <IconShoppingCart size={20} />
          <span>Adicionar</span>
        </button>
        <button
          className="flex-1 button bg-violet-700"
          onClick={() => {
            addItem(product);
            router.push("/checkout/payment");
          }}
        >
          <IconCreditCard size={20} />
          <span>Comprar</span>
        </button>
      </div>
    </div>
  );
};
