import { PaymentMethod } from "./PaymentMethod";
import OrderDelivery from "./OrderDelivery";
import OrderedItem from "./ OrderedItem";
import { Status } from "./Status";

export default interface Order {
  id: number;
  date: Date;
  status: Status;
  totalValue: number;
  items: OrderedItem[];
  delivery: OrderDelivery;
  paymentMethod: PaymentMethod;
}
