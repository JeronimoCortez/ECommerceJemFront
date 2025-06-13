import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import { useState } from "react";
import ShoppingCartButton from "../ShoppingCartButton/ShoppingCartButton";
import MenuMobile from "../MenuMobile/MenuMobile";
import OpenSearch from "../OpenSearch/OpenSearch";
import { useParams } from "react-router-dom";

const FilterHM = () => {
  const [menuMobile, setMenuMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const { gender } = useParams();

  return (
    <>
      <div className="hidden md:flex justify-between items-center p-4">
        <Logo />
        <div>
          <div className="flex justify-around items-center font-bold">
            <a href="/view/hombre">Hombre</a>
            <a href="/view/mujer">Mujer</a>
            <a href="/catalogue/niños">Niño/a</a>
            <a href="/accesories">Accesorios</a>
          </div>
          <div className="flex justify-between items-center gap-6 ">
            <a href={`${gender ? `/catalogue/${gender}` : "/accesories"}`}>
              Ver todo en {gender || "accesorios"}
            </a>
            <a href="">Calzado</a>
            <a href="">Ropa</a>
            <a href="/accesories">Accesorios</a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Search />
          <ShoppingCartButton />
        </div>
      </div>

      {/* Menu mobile */}
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
