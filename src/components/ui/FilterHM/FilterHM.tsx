import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import { useState } from "react";
import ShoppingCartButton from "../ShoppingCartButton/ShoppingCartButton";
import MenuMobile from "../MenuMobile/MenuMobile";
import OpenSearch from "../OpenSearch/OpenSearch";

const FilterHM = () => {
  const [menuMobile, setMenuMobile] = useState(false);
  const [search, setSearch] = useState(false);

  return (
    <>
      <div className="hidden md:flex justify-between items-center p-4">
        <Logo />
        <div>
          <div className="flex justify-around items-center font-bold">
            <a href="">Hombre</a>
            <a href="">Mujer</a>
            <a href="">Niño/a</a>
            <a href="">Accesorios</a>
          </div>
          <div className="flex justify-between items-center gap-6 ">
            <a href="">Ver todo en {"Categoria"}</a>
            <a href="">Calzado</a>
            <a href="">Ropa</a>
            <a href="">Accesorios</a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Search />
          <span className="material-symbols-outlined">shopping_bag</span>
        </div>
      </div>

      <div className="md:hidden flex justify-between p-1">
        <Logo />
        <div className="flex gap-2">
          <button
            onClick={() => {
              setMenuMobile(!menuMobile);
            }}
            className=""
          >
            <Icon icon="stash:burger-classic-duotone" width="24" height="24" />
          </button>
          <ShoppingCartButton />
          <button onClick={() => setSearch(!search)}>
            <Icon icon="mdi:magnify" className="hover:cursor-pointer text-xl" />
          </button>
        </div>
        {menuMobile && <MenuMobile onClose={() => setMenuMobile(false)} />}
        {search && <OpenSearch onClose={() => setSearch(false)} />}
      </div>
    </>
  );
};

export default FilterHM;
