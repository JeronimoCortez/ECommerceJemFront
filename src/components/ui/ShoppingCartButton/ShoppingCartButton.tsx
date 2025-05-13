import { useState } from "react";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

const ShoppingCartButton = () => {
  const [isOpenShoppingCart, setOpenShoppingCart] = useState<Boolean>(false);
  return (
    <>
      <button
        className="all:unset flex items-center gap-2 hover:cursor-pointer"
        onClick={() => setOpenShoppingCart(true)}
      >
        <span className="material-symbols-outlined">shopping_cart</span>
      </button>
      {isOpenShoppingCart && (
        <ShoppingCart onClose={() => setOpenShoppingCart(false)} />
      )}
    </>
  );
};

export default ShoppingCartButton;
