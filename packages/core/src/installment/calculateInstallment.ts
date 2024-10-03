import { MAX_AMOUNT_INSTALLMENTS, MONTHLY_INTEREST_RATE } from "../constants";
import Installment from "./installment";

export default class CalculateInstallment {
  // Método principal para calcular as parcelas
  execute(
    value: number,
    installmentQuantity: number = MAX_AMOUNT_INSTALLMENTS,
    interestRate: number = MONTHLY_INTEREST_RATE
  ): Installment {
    // Verifica se a quantidade de parcelas está dentro do limite permitido
    if (
      installmentQuantity < 2 ||
      installmentQuantity > MAX_AMOUNT_INSTALLMENTS
    ) {
      throw new Error(
        `Quantidade de parcelas deve ser entre 2 e ${MAX_AMOUNT_INSTALLMENTS}`
      );
    }

    // Calcula o valor total com juros compostos
    const totalWithInterest = this.calculateCompoundInterest(
      value,
      interestRate,
      installmentQuantity
    );

    // Retorna um objeto com os valores calculados
    return {
      installmentValue: this.withTwoDecimalPlaces(
        totalWithInterest / installmentQuantity
      ),
      totalValue: this.withTwoDecimalPlaces(totalWithInterest),
      installmentQuantity,
      interestRate,
    };
  }

  // Método privado para calcular juros compostos
  private calculateCompoundInterest(
    totalValue: number,
    monthlyInterestRate: number,
    quantityInstallments: number
  ): number {
    return totalValue * Math.pow(1 + monthlyInterestRate, quantityInstallments);
  }

  // Método privado para arredondar valores para duas casas decimais
  private withTwoDecimalPlaces(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
