import { Icon } from "@iconify/react/dist/iconify.js";
import { FC } from "react";

type MenuMobile = {
  onClose: VoidFunction;
};

const MenuMobile: FC<MenuMobile> = ({ onClose }) => {
  return (
    <div className="w-[100vw] h-[50vh] absolute bg-[#fff] flex flex-col items-center justify-center gap-2 text-xl z-[999] font-bold">
      <Icon
        className="hover:cursor-pointer absolute right-0 top-0 mt-2"
        icon="line-md:menu-to-close-alt-transition"
        width="24"
        height="24"
        onClick={onClose}
      />
      <a href="">Hombre</a>
      <a href="">Mujer</a>
      <a href="">Accesorios</a>
      <a href="">Niños/as</a>
      <a href="">Ver todo</a>
    </div>
  );
};

export default MenuMobile;
