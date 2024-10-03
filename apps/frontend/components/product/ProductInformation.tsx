import { ProductSpecifications } from "./ProductSpecifications";
import { Product } from "@gstore/core";
import Image from "next/image";

export interface ProductInformationProps {
  product: Product;
}

export const ProductInformation = ({ product }: ProductInformationProps) => {
  return product ? (
    <div className="flex items-center bg-violet-dark rounded-xl p-5">
      <div className="flex-1 relative flex justify-center h-96">
        <Image
          src={product.image}
          fill
          className="object-contain p-7"
          alt="Imagem do Produto"
        />
      </div>
      <ProductSpecifications product={product} />
    </div>
  ) : null;
};
