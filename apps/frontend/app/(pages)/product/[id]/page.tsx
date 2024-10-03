import { BannerBuy } from "@/components/product/BannerBuy";
import { ProductInformation } from "@/components/product/ProductInformation";
import { ProductNotFound } from "@/components/product/ProductNotFound";
import { ProductTitle } from "@/components/product/ProductTitle";
import { products } from "@gstore/core";

const PageProduct = (props: any) => {
  const id = +props.params.id;
  const product = products.find((product) => product.id === id);
  return product ? (
    <div className="flex flex-col gap-20 container py-10">
      <div className="flex flex-col gap-10">
        <ProductTitle product={product} />
        <ProductInformation product={product} />
        <BannerBuy product={product} />
      </div>
    </div>
  ) : (
    <ProductNotFound />
  );
};

export default PageProduct;
