import { useEffect, useState } from "react";
import DeleteButton from "../DeleteButton/DeleteButton";
import { Estado } from "../../../types/enums/Estado.enum";
import { orderStore } from "../../../store/orderStore";
import useOrder from "../../../hook/useOrder";

interface Props {
  sortKey: string;
}

const getRowColor = (estado: Estado) => {
  switch (estado) {
    case Estado.PENDIENTE:
      return "bg-yellow-300";
    case Estado.EN_PROCESO:
      return "bg-blue-300";
    case Estado.COMPLETADO:
      return "bg-green-300";
    default:
      return "";
  }
};

const SalesTable: React.FC<Props> = ({ sortKey }) => {
  const { orders } = orderStore();
  const { getOrders, deleteOrderById, altaOrderHook, modificarEstadoHook } =
    useOrder();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadMoreOrders();
  }, []);

  const loadMoreOrders = async () => {
    if (!hasMore) return;
    const data = await getOrders(page, 9);
    if (data) {
      setPage((prev) => prev + 1);
      setHasMore(!data.last);
    }
  };

  return (
    <div className="mt-2">
      <table className="w-full text-left">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-2">Usuario</th>
            <th>Fecha</th>
            <th>Precio Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((sale) => (
            <tr key={sale.id} className={`${sale.activo ? "" : "bg-red-500"}`}>
              <td className="p-2">{sale.usuario?.email || "N/A"}</td>
              <td>{new Date(sale.fecha).toLocaleDateString()}</td>
              <td>${sale.precioTotal.toLocaleString()}</td>
              <td>
                <select
                  value={sale.estado}
                  onChange={(e) => {
                    const value = e.target.value as unknown as Estado;
                    modificarEstadoHook(sale.id, value);
                  }}
                  className={`${
                    sale.estado === Estado.PENDIENTE
                      ? "text-yellow-500 font-bold"
                      : sale.estado === Estado.EN_PROCESO
                      ? "text-blue-500 font-bold"
                      : sale.estado === Estado.COMPLETADO
                      ? "text-green-500 font-bold"
                      : ""
                  } border border-gray-300 py-1 rounded`}
                >
                  <option value={Estado.PENDIENTE}>Pendiente</option>
                  <option value={Estado.EN_PROCESO}>En Proceso</option>
                  <option value={Estado.COMPLETADO}>Completado</option>
                </select>
              </td>
              <td className="flex gap-2 mt-[14px]">
                {sale.activo ? (
                  <DeleteButton onClick={() => deleteOrderById(sale.id)} />
                ) : (
                  <button
                    className="font-bold text-center cursor-pointer"
                    onClick={() => altaOrderHook(sale.id)}
                  >
                    Activar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
