import { useState } from "react";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { Icon } from "@iconify/react/dist/iconify.js";
import { shoppingCartStore } from "../../../store/shoppingCartStore";

const ShoppingCartButton = () => {
  const [isOpenShoppingCart, setOpenShoppingCart] = useState<Boolean>(false);
  const { detallesShoppingCart: detalles } = shoppingCartStore();
  return (
    <>
      <button
        className="all:unset flex items-center gap-2 hover:cursor-pointer"
        onClick={() => setOpenShoppingCart(true)}
      >
        <div className="relative w-fit">
          <Icon icon="mdi-light:cart" width="24" height="24" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {detalles.length}
          </span>
        </div>
      </button>
      {isOpenShoppingCart && (
        <ShoppingCart onClose={() => setOpenShoppingCart(false)} />
      )}
    </>
  );
};

export default ShoppingCartButton;
