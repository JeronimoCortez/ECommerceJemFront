import { useState } from "react";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { Icon } from "@iconify/react/dist/iconify.js";

const ShoppingCartButton = () => {
  const [isOpenShoppingCart, setOpenShoppingCart] = useState<Boolean>(false);
  return (
    <>
      <button
        className="all:unset flex items-center gap-2 hover:cursor-pointer"
        onClick={() => setOpenShoppingCart(true)}
      >
        <Icon icon="mdi-light:cart" width="24" height="24" />
      </button>
      {isOpenShoppingCart && (
        <ShoppingCart onClose={() => setOpenShoppingCart(false)} />
      )}
    </>
  );
};

export default ShoppingCartButton;
