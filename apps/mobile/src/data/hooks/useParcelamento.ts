import { CalculateInstallment } from "@gstore/core";

export default function useParcelamento(
  valor: number,
  quantidade: number = 12
) {
  return new CalculateInstallment().execute(valor, quantidade);
}
