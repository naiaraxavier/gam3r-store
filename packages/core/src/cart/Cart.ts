import { Product } from "../products";
import CartItem from "./CartItem";

export default class Cart {
  constructor(readonly items: CartItem[] = []) {}

  addItem(product: Product): Cart {
    const item = this.itemForProduct(product);
    if (item) {
      return new Cart(this.alterQuantityItem(this.items, product, 1));
    } else {
      return new Cart([...this.items, { product, quantity: 1 }]);
    }
  }

  removeItem(product: Product) {
    const item = this.itemForProduct(product);
    if (!item) return this;

    return new Cart(this.alterQuantityItem(this.items, product, -1));
  }

  removeProduct(product: Product) {
    const item = this.itemForProduct(product);
    if (!item) return this;

    return new Cart(
      this.items.filter((item) => item.product.id !== product.id)
    );
  }

  clear() {
    return new Cart();
  }

  get qtItems() {
    return this.items.map((item) => item.quantity).reduce((a, b) => a + b, 0);
  }

  get totalValue() {
    return this.items
      .map((item) => item.product.promotionalPrice * item.quantity)
      .reduce((a, b) => a + b, 0);
  }

  get totalValueFull() {
    return this.items
      .map((item) => item.product.basePrice * item.quantity)
      .reduce((a, b) => a + b, 0);
  }

  private itemForProduct(product: Product): CartItem | undefined {
    return this.items.find((item) => item.product.id === product.id);
  }

  private alterQuantityItem(
    items: CartItem[],
    product: Product,
    difference: number
  ): CartItem[] {
    return items
      .map((i) =>
        i.product.id === product.id
          ? { ...i, quantity: i.quantity + difference }
          : i
      )
      .filter((i) => i.quantity > 0);
  }
}
