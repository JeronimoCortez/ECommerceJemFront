import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import PaymentArDownButton from "../PaymentArDownButton/PaymentArDownButton";
import NewButton from "../NewButton/NewButton";
import CreateProduct from "../CreateProduct/CreateProduct";
import { FC, useState } from "react";
import { IProduct } from "../../../types/IProduct";
import useProduct from "../../../hook/useProduct";

interface Props {
  data: IProduct[];
  sortKey: string;
  vista: string;
}

const ProductTable: FC<Props> = ({ data, sortKey, vista }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const { deleteProductHook, altaPrducto } = useProduct();

  const handleEditClick = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const deleteProduct = async (id: number) => {
    await deleteProductHook(id);
  };

  const sortedData = [...data].sort((a, b) => {
    switch (sortKey) {
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
            <th>Activo</th>
            <th>Precio Venta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((p, i) => (
            <tr key={i} className={`${p.activo ? "" : "bg-red-500"}`}>
              <td className="p-2">{p.nombre}</td>
              <td>{p.activo ? "SI" : "NO"}</td>
              <td className={`${p.descuento ? "text-green-500" : ""}`}>{`${
                p.descuento
                  ? p.precio - p.precio * (p.descuento.descuento / 100)
                  : p.precio.toLocaleString()
              }`}</td>

              <td className="flex gap-2 mt-[14px]">
                {p.activo ? (
                  <>
                    {p.descuento ? (
                      <PaymentArDownButton
                        idProducto={p.id}
                        descuento={p.descuento}
                      />
                    ) : (
                      <PaymentArDownButton idProducto={p.id} />
                    )}
                    <EditButton onClick={() => handleEditClick(p)} />
                    <DeleteButton onClick={() => deleteProduct(p.id)} />
                    {isModalOpen && selectedProduct && (
                      <CreateProduct
                        initialData={selectedProduct}
                        onClose={() => setIsModalOpen(false)}
                      />
                    )}
                  </>
                ) : (
                  <button
                    className="font-bold text-center cursor-pointer"
                    onClick={() => altaPrducto(p.id)}
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

export default ProductTable;
