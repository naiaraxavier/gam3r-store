import { BannerBuy } from "@/components/product/BannerBuy";
import { ExpertReviews } from "@/components/product/ExpertReviews";
import { PriceMeter } from "@/components/product/PriceMeter";
import { ProductInformation } from "@/components/product/ProductInformation";
import { ProductNotFound } from "@/components/product/ProductNotFound";
import { ProductTitle } from "@/components/product/ProductTitle";
import { UserReviews } from "@/components/product/UserReviews";
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
        <PriceMeter product={product} />
      </div>
      <UserReviews product={product} />
      <ExpertReviews product={product} />
    </div>
  ) : (
    <ProductNotFound />
  );
};

export default PageProduct;
