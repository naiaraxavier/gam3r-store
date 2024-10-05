"use client";
import { CartItem } from "@/components/checkout/cart/CartItem";
import { EmptyCart } from "@/components/checkout/cart/EmptyCart";
import { TotalCart } from "@/components/checkout/cart/TotalCart";
import { HeaderCheckout } from "@/components/checkout/HeaderCheckout";
import useCart from "@/data/hooks/useCart";

const PageCart = () => {
  const { items, qtItems, totalValue, addItem, removeItem, removeProduct } =
    useCart();

  return (
    <div className="flex flex-col gap-5 container">
      <HeaderCheckout step="Carrinho" />
      <div className="flex flex-col gap-4">
        {items.length === 0 && <EmptyCart />}
        {items.map((item: any) => (
          <CartItem
            key={item.product.id}
            item={item}
            addItem={() => addItem(item.product)}
            removeItem={() => removeItem(item.product)}
            removeProduct={() => removeProduct(item.product)}
          />
        ))}
      </div>
      <TotalCart qtItems={qtItems} totalValue={totalValue} />
    </div>
  );
};

export default PageCart;
