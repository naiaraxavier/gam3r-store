import Link from "next/link";

interface HeaderCheckoutProps {
  step: "Carrinho" | "Pagamento";
}

export const HeaderCheckout = ({ step }: HeaderCheckoutProps) => {
  const selectedColor = (stepParam: string) => {
    return step === stepParam ? "text-pink-500" : "text-zinc-400";
  };

  const selectedBk = (stepParam: string) => {
    return step === stepParam
      ? "bg-pink-500 text-white"
      : "bg-zinc-400 text-black";
  };

  const renderizarItem = (
    step: "Carrinho" | "Pagamento",
    index: number,
    title: string,
    path: string
  ) => {
    return (
      <Link
        href={path}
        className={`
                    flex items-center gap-2 cursor-pointer
                    ${selectedColor(step)}
                  `}
      >
        <span
          className={`
                      flex justify-center items-center 
                      text-xs font-bold w-5 h-5 rounded-full 
                      ${selectedBk(step)}
                    `}
        >
          {index}
        </span>
        <span>{title}</span>
      </Link>
    );
  };

  return (
    <div className="flex justify-center items-center gap-6 h-20 select-none">
      {renderizarItem("Carrinho", 1, "Carrinho", "/checkout/cart")}
      <div className="bg-zinc-300 h-px w-12"></div>
      {renderizarItem("Pagamento", 2, "Pagamento", "/checkout/payment")}
    </div>
  );
};
