import { IconTag } from "@tabler/icons-react";
import { Tag } from "../shared/Tag";
import { Product } from "@gstore/core";

export interface ProductSpecificationsProps {
  product: Product;
}

export const ProductSpecifications = ({
  product,
}: ProductSpecificationsProps) => {
  return product ? (
    <div className="flex-1 flex flex-col gap-1">
      <div className="flex mb-3">
        <Tag label={product.specifications.highlight} icon={IconTag} outlined />
      </div>
      {product?.specifications &&
        Object.keys(product.specifications)
          .filter((k) => k !== "highlight")
          .map((key) => (
            <div key={key} className="flex gap-1">
              <span className="p-2 w-1/3 bg-white/5 rounded">{key}</span>
              <span className="p-2 w-2/3 bg-white/5 rounded">
                {product.specifications[key]}
              </span>
            </div>
          ))}
    </div>
  ) : null;
};
