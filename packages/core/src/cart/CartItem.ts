import { Product } from "../products";

export default interface CartItem {
  product: Product;
  quantity: number;
}
