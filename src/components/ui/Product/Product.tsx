import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";

interface Producto {
  nombre: string;
  categoria: string;
  precioVenta: number;
  costo: number;
  ganancia: number;
  stock: number;
}

interface Props {
  data: Producto[];
  sortKey: string;
}

const ProductTable: React.FC<Props> = ({ data, sortKey }) => {
  const sortedData = [...data].sort((a, b) => {
    switch (sortKey) {
      case "Categoría":
        return a.categoria.localeCompare(b.categoria);
      case "Precio Venta":
        return b.precioVenta - a.precioVenta;
      case "Costo":
        return b.costo - a.costo;
      case "Ganancia":
        return b.ganancia - a.ganancia;
      case "Stock":
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  return (
    <table className="w-full text-left">
      <thead className="bg-black text-white">
        <tr>
          <th className="p-2">Producto</th>
          <th>Categoría</th>
          <th>Precio Venta</th>
          <th>Costo</th>
          <th>Ganancia</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((p, i) => (
          <tr
            key={i}
            className={`${p.stock < 15 ? "bg-red-500 text-white" : ""}`}
          >
            <td className="p-2">{p.nombre}</td>
            <td>{p.categoria}</td>
            <td>{`$${p.precioVenta.toLocaleString()}`}</td>
            <td>{`$${p.costo.toLocaleString()}`}</td>
            <td>{`$${p.ganancia.toLocaleString()}`}</td>
            <td>{p.stock}</td>
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

export default ProductTable;
