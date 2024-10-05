import { Coin } from "@gstore/core";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";

export interface TotalCartProps {
  qtItems: number;
  totalValue: number;
}

export const TotalCart = ({ qtItems, totalValue }: TotalCartProps) => {
  return (
    <div className="flex justify-end items-center gap-7 bg-violet-dark h-24 rounded-xl px-7">
      <div className="flex flex-col">
        <span className="text-zinc-400">
          Total ({qtItems} {qtItems === 1 ? "item" : "items"}):
        </span>
        <span className="text-emerald-500 text-2xl font-semibold">
          {Coin.formate(totalValue ?? 0)}
        </span>
      </div>
      <Link href="/checkout/payment" className="button bg-indigo-700">
        <IconShoppingCart size={20} />
        <span>Continuar</span>
      </Link>
    </div>
  );
};
