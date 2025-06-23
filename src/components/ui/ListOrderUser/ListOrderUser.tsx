import { FC, useState } from "react";
import { IOrdenCompra } from "../../../types/IOrdenCompra";
import OrderUser from "../OrderUser/OrderUser";

type IListOrderUser = {
  orders?: IOrdenCompra[];
};

const ListOrderUser: FC<IListOrderUser> = ({ orders }) => {
  const [showPending, setShowPending] = useState(false);
  const [orderActive, setOrderActive] = useState<IOrdenCompra | null>();

  const handleSetPending = () => {
    setShowPending(!showPending);
  };

  const handleSetOrderUser = (order: IOrdenCompra) => {
    if (orderActive === null) {
      setOrderActive(order);
    } else {
      setOrderActive(null);
    }
  };

  return (
    <div className="md:flex md:mt-2 md:items-center gap-2">
      <div className="md:w-[40vw]">
        <h5 className="text-xl text-center font-bold my-2">Mis compras</h5>
        <div className="flex gap-2 my-2 p-2">
          <input
            type="checkbox"
            className="cursor-pointer"
            onClick={handleSetPending}
          />
          <p>Mostrar solo pendientes</p>
        </div>
        {showPending && orders
          ? orders
              .filter((order) => order.estado === "PENDIENTE")
              .map((order) => (
                <div className="cursor-pointer bg-[#F6CF4C]/50 w-full py-4 text-center font-bold">
                  <p>Fecha: {new Date(order.fecha).toISOString()}</p>
                </div>
              ))
          : orders &&
            orders.map((order) => (
              <div
                onClick={() => handleSetOrderUser(order)}
                className={`cursor-pointer ${
                  order.estado === "PENDIENTE"
                    ? "bg-[#F6CF4C]/50 w-full"
                    : order.estado === "EN_PROCESO"
                    ? "bg-[#3366CC]/50 w-full"
                    : order.estado === "COMPLETADO"
                    ? "bg-[#008000]/50 w-full"
                    : ""
                } py-4 text-center font-bold`}
              >
                <p>Fecha: {new Date(order.fecha).toISOString()}</p>
              </div>
            ))}
        {!orders && <p className="Font-bold">No hay ordenes para mostrar</p>}
      </div>
      {orderActive && <OrderUser order={orderActive} />}
    </div>
  );
};

export default ListOrderUser;
