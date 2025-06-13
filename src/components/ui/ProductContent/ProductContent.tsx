import { Icon } from "@iconify/react/dist/iconify.js";
import { IProduct } from "../../../types/IProduct";
import { FC } from "react";

interface ProductContentProps {
  product: IProduct;
}

const ProductContent: FC<ProductContentProps> = ({ product }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-[calc(100vh-40px)] p-6 gap-8">
      {/* Sección de imagen */}
      <div className="w-1/2 flex flex-col items-center gap-2">
        <img
          className="w-[30vw] md:h-[50vh] shadow-md"
          //src={product.imagen}
          alt={product.nombre}
        />
        <div>{/* Verificar si esta filtro de talles e incluirlo */}</div>
        {/* <ProductCounter /> */}
      </div>
      {/* Sección de detalles */}
      <div className="w-1/2 flex flex-col gap-1">
        <h4 className="text-[1rem] md:text-[2rem] font-bold">
          {product.nombre}
        </h4>
        <h5 className="text-[1rem] md:text-[1.5rem] font-bold">
          {product.descripcion}
        </h5>
        <p className="text-xs md:text-s">{product.descripcion}</p>
        {/* <span 
              key={categoria.id}
              className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm mr-2 mb-2"
            >
              {categoria.nombre}
            </span> */}
        <p className="text-xs md:text-">
          {product.marca} - {product.color}
        </p>
        <p className="text-xs md:text-">
          {product.stock > 0
            ? `Stock disponible: ${product.stock} unidades`
            : "Sin stock disponible"}
        </p>
        <span className="text-xs md:text-">{product.precio}</span>
        <button className="all:unset flex bg-[#000] text-white font-bold px-4 py-2 hover:cursor-pointer gap-2 shadow-md max-w-[150px] mx-auto">
          Comprar <Icon icon="mdi-light:cart" width="24" height="24" />
        </button>
      </div>
    </div>
  );
};

export default ProductContent;
