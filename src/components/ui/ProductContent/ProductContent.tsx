import { Icon } from "@iconify/react/dist/iconify.js";
import { IProduct } from "../../../types/IProduct";
import { FC, useState } from "react";
import { ITalle } from "../../../types/ITalle";
import ShoppingCartButton from "../ShoppingCartButton/ShoppingCartButton";
import { shoppingCartStore } from "../../../store/shoppingCartStore";
import { IDetalle } from "../../../types/IDetalle";
import { ProductCounter } from "../ProductCounter/ProductCounter";

interface ProductContentProps {
  product: IProduct;
}

const ProductContent: FC<ProductContentProps> = ({ product }) => {
  const [selectTalle, setSelectTalle] = useState<ITalle | null>(null);
  const { addDetalle } = shoppingCartStore();

  const handleBuy = () => {
    const detalle: IDetalle = {
      producto: product,
      talle: selectTalle?.talle || "",
      cantidad: 1,
    };
    addDetalle(detalle);
  };

  return (
    <>
      <div className="absolute right-2">
        <ShoppingCartButton />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center min-h-[calc(100vh-40px)] p-6 gap-8">
        {/* Sección de imagen */}
        <div className="w-1/2 flex flex-col items-center gap-2">
          <img
            className="w-[30vw] md:h-[50vh] shadow-md"
            src={product.imagen}
            alt={product.nombre}
          />
          <div className="flex gap-2">
            {product.talles.map(
              (t) =>
                t.stock > 0 && (
                  <button
                    key={t.talle}
                    onClick={() => setSelectTalle(t)}
                    className={`w-[2rem] h-[2rem] border cursor-pointer bg-[#D9D9D9]/75 ${
                      selectTalle?.talle === t.talle
                        ? "font-bold border-black"
                        : ""
                    }`}
                  >
                    {t.talle}
                  </button>
                )
            )}
          </div>
        </div>

        {/* Sección de detalles */}
        <div className="w-1/2 flex flex-col gap-1">
          <h4 className="text-[1rem] md:text-[2rem] font-bold">
            {product.nombre}
          </h4>
          <h5 className="text-[1rem] md:text-[1.5rem] font-bold">
            {product.descripcion}
          </h5>
          <p className="text-xs md:text-sm">{product.descripcion}</p>
          <p className="text-xs md:text-sm">
            {product.marca} - {product.color}
          </p>
          <span className="text-xs md:text-base font-semibold">
            ${product.precio}
          </span>

          <button
            onClick={handleBuy}
            disabled={!selectTalle}
            className={`all:unset flex items-center justify-center font-bold px-4 py-2 gap-2 shadow-md max-w-[150px] mx-auto mt-4
    ${
      selectTalle
        ? "bg-black text-white cursor-pointer"
        : "bg-gray-400 text-white cursor-not-allowed"
    }`}
          >
            Añadir al carrito
            <Icon icon="mdi-light:cart" width="24" height="24" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductContent;
