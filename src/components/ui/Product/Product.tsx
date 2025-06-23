import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import PaymentArDownButton from "../PaymentArDownButton/PaymentArDownButton";
import NewButton from "../NewButton/NewButton";
import CreateProduct from "../CreateProduct/CreateProduct";
import { FC, useEffect, useState } from "react";
import { IProduct } from "../../../types/IProduct";
import useProduct from "../../../hook/useProduct";
import productStore from "../../../store/productStore";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  data: IProduct[];
  sortKey: string;
  vista: string;
}

const ProductTable: FC<Props> = ({ data, sortKey, vista }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const { deleteProductHook, altaPrducto, eliminarDescuentoHook } =
    useProduct();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { getProducts } = useProduct();
  const { products } = productStore();

  useEffect(() => {
    loadMoreProducts();
  });

  const loadMoreProducts = async () => {
    if (!hasMore) return;
    const data = await getProducts(page, 9);
    if (data) {
      setPage((prev) => prev + 1);
      setHasMore(!data.last);
    }
  };

  const handleEditClick = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const deleteProduct = async (id: number) => {
    await deleteProductHook(id);
  };

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
          {products.map((p, i) => (
            <tr key={i} className={`${p.activo ? "" : "bg-red-500"}`}>
              <td className="p-2">{p.nombre}</td>
              <td>{p.activo ? "SI" : "NO"}</td>
              <td
                className={`${p.descuento ? "text-green-500" : ""}`}
              >{`$ ${p.precio}`}</td>

              <td className="flex gap-2 mt-[14px]">
                {p.activo ? (
                  <>
                    {p.descuento ? (
                      <>
                        <button onClick={() => eliminarDescuentoHook(p.id)}>
                          <Icon
                            icon="mdi:tag-remove-outline"
                            className="text-red-600 hover:text-red-800 cursor-pointer text-xl"
                          />
                        </button>
                        <PaymentArDownButton
                          idProducto={p.id}
                          descuento={p.descuento}
                        />
                      </>
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
