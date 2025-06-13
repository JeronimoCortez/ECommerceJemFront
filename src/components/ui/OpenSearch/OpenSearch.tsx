import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "../Logo/Logo";
import { FC } from "react";

type OpenSearch = {
  onClose: VoidFunction;
};

const OpenSearch: FC<OpenSearch> = ({ onClose }) => {
  return (
    <div className="w-[100vw] h-[100vh] absolute z-[999] top-0 bg-[#D9D9D9]/75">
      <Logo className={"md:flex hidden"} />
      <div className="w-full h-[10vh] bg-[#fff] top-0 absolute flex">
        <div className="bg-[#000] flex rounded-full m-4 justify-center items-center gap-2 text-white p-2">
          <button>
            <Icon icon="mdi:magnify" className="" />
          </button>
          <input
            placeholder="Buscar"
            className="all:unset focus:outline-none focus:ring-0 text-white"
          />
        </div>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default OpenSearch;
