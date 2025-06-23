import { FC } from "react";
import { IOrdenCompra } from "../../../types/IOrdenCompra";

type IOrderUser = {
  order: IOrdenCompra;
};

const OrderUser: FC<IOrderUser> = ({ order }) => {
  return (
    <div className="w-full p-4">
      <h5 className="text-xl text-center font-bold my-2">#{order.id}</h5>
      {order.detalles?.map((detalle) => (
        <div className="flex w-full justify-between items-center px-4">
          <img
            className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] object-cover"
            src={detalle.producto.imagen || "../NoImage.png"}
            alt="Imagen producto"
          />
          <p>{detalle.producto.descripcion}</p>
          <p>${detalle.producto.precio}</p>
        </div>
      ))}
      <p className="right-0 absolute font-bold mr-6">${order.precioTotal}</p>
    </div>
  );
};

export default OrderUser;
