import { useState } from "react";
import DeleteButton from "../DeleteButton/DeleteButton";
import NewButton from "../NewButton/NewButton";
import { IOrdenCompra } from "../../../types/IOrdenCompra";
import { Estado } from "../../../types/enums/Estado.enum";

interface Props {
  data: IOrdenCompra[];
  sortKey: string;
  vista: string;
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

const getEstadoText = (estado: Estado) => {
  switch (estado) {
    case Estado.PENDIENTE:
      return "Pendiente";
    case Estado.EN_PROCESO:
      return "En Proceso";
    case Estado.COMPLETADO:
      return "Completado";
    default:
      return "";
  }
};

const SalesTable: React.FC<Props> = ({ data, sortKey, vista }) => {
  const [sales, setSales] = useState<IOrdenCompra[]>(data);

  const handleEstadoChange = (id: number, newEstado: Estado) => {
    setSales(prevSales =>
      prevSales.map(sale =>
        sale.id === id ? { ...sale, estado: newEstado } : sale
      )
    );
  };

  const sortedData = [...sales].sort((a, b) => {
    switch (sortKey) {
      case "Usuario":
        return a.usuario?.userName.localeCompare(b.usuario?.userName || "") || 0;
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
      <NewButton vista={vista} onClick={() => console.log("Nueva venta")} />
      
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
          {sortedData.map((sale) => (
            <tr key={sale.id} className={getRowColor(sale.estado)}>
              <td className="p-2">{sale.usuario?.userName || "N/A"}</td>
              <td>{new Date(sale.fecha).toLocaleDateString()}</td>
              <td>${sale.precioTotal.toLocaleString()}</td>
              <td>
                <select
                  value={sale.estado}
                  onChange={(e) =>
                    handleEstadoChange(sale.id, parseInt(e.target.value) as Estado)
                  }
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