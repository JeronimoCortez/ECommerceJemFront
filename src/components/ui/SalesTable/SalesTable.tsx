import { useState } from "react";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";

interface Sale {
  usuario: string;
  fecha: string;
  precio: number;
  estado: "Pendiente" | "En Progreso" | "Completada";
}

interface Props {
  data: Sale[];
  sortKey: string;
}

const getRowColor = (estado: string) => {
  switch (estado) {
    case "Pendiente":
      return "bg-yellow-300";
    case "En Progreso":
      return "bg-blue-300";
    case "Completada":
      return "bg-green-300";
    default:
      return "";
  }
};

const SalesTable: React.FC<Props> = ({ data }) => {
  const [sales, setSales] = useState<Sale[]>(data);

  const handleEstadoChange = (index: number, newEstado: Sale["estado"]) => {
    const updatedSales = [...sales];
    updatedSales[index].estado = newEstado;
    setSales(updatedSales);
  };

  return (
      <table className="w-full text-left">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-2">Usuario</th>
            <th>Fecha</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={index} className={`${getRowColor(sale.estado)}`}>
              <td className="p-2">{sale.usuario}</td>
              <td>{sale.fecha}</td>
              <td>${sale.precio.toLocaleString()}</td>
              <td>
                <select
                  value={sale.estado}
                  onChange={(e) =>
                    handleEstadoChange(index, e.target.value as Sale["estado"])
                  }
                  className="border border-gray-300 py-1 rounded"
                >
                  <option value="">Seleccione el Estado del Pedido</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Progreso">En Progreso</option>
                  <option value="Completada">Completada</option>
                </select>
              </td>
              <td className="flex gap-2 mt-[14px]">
                <EditButton />
                <DeleteButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default SalesTable;
