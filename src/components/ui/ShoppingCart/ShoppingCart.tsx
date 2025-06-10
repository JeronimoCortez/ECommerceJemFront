import { Icon } from "@iconify/react/dist/iconify.js";
import { FC } from "react";
import { shoppingCartStore } from "../../../store/shoppingCartStore";
import { ProductCounter } from "../ProductCounter/ProductCounter";

type IPropsShoppingCart = {
  onClose: VoidFunction;
};

const ShoppingCart: FC<IPropsShoppingCart> = ({ onClose }) => {
  const { detalles } = shoppingCartStore();

  return (
    <div className="fixed inset-0 bg-[#D9D9D9]/75 z-[999] ">
      <div className="absolute bg-[#fff] w-[100vw] md:w-[30vw] h-[100vh] right-0">
        <p className="text-center  font-bold mt-2">Mi compra</p>
        <Icon
          className="hover:cursor-pointer absolute right-0 top-0 mt-2"
          icon="line-md:menu-to-close-alt-transition"
          width="24"
          height="24"
          onClick={onClose}
        />
        {detalles?.map((detalle) => (
          <div className="flex items-center justify-around">
            <img
              src={`${detalle.producto.imagen}`}
              alt={`imagen ${detalle.producto.nombre}`}
              className="w-[100px] object-cover"
            />
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="">{detalle.producto.nombre}</p>
              <p>
                Talle: {detalle.talle.talle} Color: {detalle.producto.color}
              </p>
              <ProductCounter detalle={detalle} />
            </div>
            <div className="flex flex-col items-center gap-1">
              <Icon
                className="hover:cursor-pointer"
                icon="line-md:trash"
                width="24"
                height="24"
              />
              <p>${detalle.producto.precio * detalle.cantidad}</p>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-2 bg-[#D9D9D9]/75 mx-2 p-2">
          <img
            src="/1369216-1000-1000botinrojo.webp"
            alt=""
            className="w-[100px]"
          />
          <div>
            <p>Botin nike</p>
            <p>$190.000</p>
          </div>
          <button className="bg-[#000] text-white px-3 py-1 rounded-full font-bold hover:cursor-pointer">
            Agregar
          </button>
        </div>
        <div className="p-2 shadow-md">
          <p className="font-bold">
            Total: <span className="absolute right-0">$300.000</span>
          </p>
          <button className="w-full bg-[#000] text-white rounded-full mt-2 hover:cursor-pointer">
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
