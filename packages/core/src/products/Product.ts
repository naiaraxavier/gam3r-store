import Priceable from "./Priceable";
import Specifications from "./Specifications";

export default interface Product extends Priceable {
  id: number;
  note: number;
  name: string;
  brand: string;
  model: string;
  image: string;
  tags: string[];
  videoReview: string;
  description: string;
  specifications: Specifications;
}
