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
  const { getOrders } = useOrder();
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

  const sortedData = [...orders].sort((a, b) => {
    switch (sortKey) {
      case "Usuario":
        return (
          a.usuario?.userName.localeCompare(b.usuario?.userName || "") || 0
        );
      case "Fecha":
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
      case "Precio":
        return b.precioTotal - a.precioTotal;
      case "Estado":
        return a.estado - b.estado;
      default:
        return 0;
    }
  });

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
            <tr key={sale.id} className={getRowColor(sale.estado)}>
              <td className="p-2">{sale.usuario?.userName || "N/A"}</td>
              <td>{new Date(sale.fecha).toLocaleDateString()}</td>
              <td>${sale.precioTotal.toLocaleString()}</td>
              <td>
                <select
                  value={sale.estado}
                  className="border border-gray-300 py-1 rounded bg-white"
                >
                  <option value={Estado.PENDIENTE}>Pendiente</option>
                  <option value={Estado.EN_PROCESO}>En Proceso</option>
                  <option value={Estado.COMPLETADO}>Completado</option>
                </select>
              </td>
              <td className="flex gap-2 mt-[14px]">
                <DeleteButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
