import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import PaymentArDownButton from "../PaymentArDownButton/PaymentArDownButton";
import NewButton from "../NewButton/NewButton";
import CreateProduct from "../CreateProduct/CreateProduct";
import { FC, useState } from "react";
import { IProduct } from "../../../types/IProduct";

interface Props {
  data: IProduct[];
  sortKey: string;
  vista: string;
}

const ProductTable: FC<Props> = ({ data, sortKey, vista }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const handleEditClick = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const sortedData = [...data].sort((a, b) => {
    switch (sortKey) {
      case "Categoría":
        return a.categoria?.nombre.localeCompare(String(b.categoria?.nombre));
      case "Precio Venta":
        return b.precio - a.precio;
      case "Stock":
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  return (
    <div className="mt-2">
      <NewButton vista={vista} />
      <table className="w-full text-left">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-2">Producto</th>
            <th>Categoría</th>
            <th>Precio Venta</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((p, i) => (
            <tr
              key={i}
              // className={`${p.talles.map((t) => t.stock) < 15 ? "bg-red-500 text-white" : ""}`}
            >
              <td className="p-2">{p.nombre}</td>
              <td>{p.categoria?.nombre || "Sin categoria"}</td>
              <td>{`${p.precio.toLocaleString()}`}</td>
              <td>{p.stock}</td>
              <td className="flex gap-2 mt-[14px]">
                <PaymentArDownButton />
                <EditButton onClick={() => handleEditClick(p)} />
                {isModalOpen && selectedProduct && (
                  <CreateProduct
                    initialData={p}
                    onClose={() => setIsModalOpen(false)}
                  />
                )}
                <DeleteButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
