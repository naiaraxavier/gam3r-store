import { ProductFilter } from "@/components/product/ProductFilter";
import { ProductList } from "@/components/product/ProductList";

const Home = () => {
  return (
    <div className="flex-1 flex flex-col gap-5 container py-10">
      <ProductFilter />
      <ProductList />
    </div>
  );
};

export default Home;
