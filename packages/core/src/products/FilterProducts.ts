import Product from "./Product";

export default class FilterProducts {
  execute(search: string, product: Product[]): Product[] {
    const word = search.toLowerCase().split(" ");
    return product.filter((product) => {
      const text = `
                ${product.name}
                ${product.description}
                ${Object.values(product.specifications).join(" ")}
                ${product.brand}
            `.toLowerCase();
      return word.every((palavra) => text.includes(palavra));
    });
  }
}
