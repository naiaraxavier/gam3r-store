export default class Coin {
  static formate(
    value: number,
    locale: string = "pt-BR",
    currency: string = "BRL"
  ): string {
    return (value ?? 0).toLocaleString(locale, {
      style: "currency",
      currency,
    });
  }
}
