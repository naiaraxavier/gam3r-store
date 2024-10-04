import { Product } from "../products";

export default interface OrderedItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
}
