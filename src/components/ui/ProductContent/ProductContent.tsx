import { Icon } from "@iconify/react/dist/iconify.js";
import ProductCounter from "../ProductCounter/ProductCounter";

const ProductContent = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-[calc(100vh-40px)] p-6">
      <div className="w-1/2 flex flex-col items-center gap-2">
        <img
          className="w-[30vw] md:h-[50vh] shadow-md"
          src="/BotinesNike.png"
          alt="Imagen producto"
        />
        <div>{/* Verificar si esta filtro de talles e incluirlo */}</div>
        <ProductCounter />
      </div>
      <div className="w-1/2 flex flex-col gap-1">
        <h4 className="text-[1rem] md:text-[2rem] font-bold">
          {"Nike Vapor 16 A. Mercurial "}
        </h4>
        <h5 className="text-[1rem] md:text-[1.5rem]">
          {"Botines de Pasto Natural"}
        </h5>
        <p className="text-xs md:text-s">
          {
            "Lorem ipsum dolor sit amet consectetur. Dictum accumsan nisl arcu eu turpis erat. Tellus sem ultrices volutpat elementum."
          }
        </p>
        <p className="text-xs md:text-s">Botines</p>
        <p className="text-xs md:text-s">Mendoza Argentina</p>
        <p className="text-xs md:text-s">Stock: 12</p>{" "}
        {/*Incluir logica segun disponibilidad de stock por talle*/}
        <p className="text-xs md:text-s">{"$75.999"}</p>
        <button className="all:unset flex bg-[#000] text-white font-bold px-4 py-2 hover:cursor-pointer gap-2 shadow-md max-w-[150px] mx-auto">
          Comprar <Icon icon="mdi-light:cart" width="24" height="24" />
        </button>
      </div>
    </div>
  );
};

export default ProductContent;
