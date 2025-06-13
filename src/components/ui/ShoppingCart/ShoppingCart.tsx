import { Icon } from "@iconify/react/dist/iconify.js";
import { FC, useEffect, useState } from "react";
import { shoppingCartStore } from "../../../store/shoppingCartStore";
import { ProductCounter } from "../ProductCounter/ProductCounter";
import { useNavigate } from "react-router-dom";

type IPropsShoppingCart = {
  onClose: VoidFunction;
};

const ShoppingCart: FC<IPropsShoppingCart> = ({ onClose }) => {
  const { detalles, deleteDetalle } = shoppingCartStore();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const nuevoTotal = detalles.reduce((acc, detalle) => {
      return acc + detalle.producto.precio * detalle.cantidad;
    }, 0);
    setTotal(nuevoTotal);
  }, [detalles]);

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
                Talle: {detalle.talle} Color: {detalle.producto.color}
              </p>
              <ProductCounter detalle={detalle} />
            </div>
            <div className="flex flex-col items-center gap-1">
              <Icon
                onClick={() => deleteDetalle(detalle.producto.id)}
                className="hover:cursor-pointer"
                icon="line-md:trash"
                width="24"
                height="24"
              />
              <p>${detalle.producto.precio} c/u</p>
            </div>
          </div>
        ))}

        <div className="p-2 shadow-md">
          <p className="font-bold">
            Total: <span className="absolute right-0">${total}</span>
          </p>
          <button
            onClick={() => navigate("/order")}
            className="w-full bg-[#000] text-white rounded-full mt-2 hover:cursor-pointer"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
