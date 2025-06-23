import { useState, useEffect } from "react";
import JEMBar from "../JEMBar/JEMBar";
import LoginBar from "../LoginBar/LoginBar";
import SortFiltersAdmin from "../SortFiltersAdmin/SortFiltersAdmin";
import UserTable from "../User/User";
import ProductTable from "../Product/Product";
import SalesTable from "../SalesTable/SalesTable";
import CategoryTable from "../CategoryTable/CategoryTable";
import useProduct from "../../../hook/useProduct";
import productStore from "../../../store/productStore";

const AdminPanel = () => {
  const [vista, setVista] = useState<
    "usuarios" | "productos" | "categoria" | "compras"
  >("usuarios");
  const userOptions = ["Usuario", "ID", "Mail"];
  const prodOptions = [
    "Categoría",
    "Precio Venta",
    "Costo",
    "Ganancia",
    "Stock",
  ];
  const salesOptions = ["Usuario", "Fecha", "Precio", "Estado"];
  const categoryOptions = ["Categoria", "Tipo"];
  const [options, setOptions] = useState<string[]>(userOptions);
  const [sortKey, setSortKey] = useState<string>(userOptions[0]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { getProducts } = useProduct();
  const { products } = productStore();

  useEffect(() => {
    if (vista === "usuarios") {
      setOptions(userOptions);
      setSortKey(userOptions[0]);
    } else if (vista === "productos") {
      loadMoreProducts();
      setOptions(prodOptions);
      setSortKey(prodOptions[0]);
    } else if (vista === "compras") {
      setOptions(salesOptions);
      setSortKey(salesOptions[0]);
    } else if (vista === "categoria") {
      setOptions(categoryOptions);
      setSortKey(categoryOptions[0]);
    }
  }, [vista]);
  const loadMoreProducts = async () => {
    if (!hasMore) return;
    const data = await getProducts(page, 9);
    if (data) {
      setPage((prev) => prev + 1);
      setHasMore(!data.last);
    }
  };

  return (
    <div>
      <JEMBar />
      <LoginBar />
      <div className="flex items-center justify-center gap-8 py-4 bg-white text-black text-lg mt-4">
        <button
          className={`hover:underline cursor-pointer ${
            vista === "productos" ? "underline" : ""
          }`}
          onClick={() => setVista("productos")}
        >
          Productos
        </button>
        <button
          className={`hover:underline cursor-pointer ${
            vista === "categoria" ? "underline" : ""
          }`}
          onClick={() => setVista("categoria")}
        >
          Categoria
        </button>
        <button
          className={`hover:underline cursor-pointer ${
            vista === "compras" ? "underline" : ""
          }`}
          onClick={() => setVista("compras")}
        >
          Compras
        </button>
        <button
          className={`hover:underline cursor-pointer ${
            vista === "usuarios" ? "underline" : ""
          }`}
          onClick={() => setVista("usuarios")}
        >
          Usuarios
        </button>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-center">
          <SortFiltersAdmin
            options={options}
            selected={sortKey}
            onSelect={setSortKey}
          />
        </div>
        {vista === "usuarios" && <UserTable sortKey={sortKey} vista={vista} />}

        {vista === "productos" && (
          <ProductTable data={products} sortKey={sortKey} vista={vista} />
        )}

        {vista === "categoria" && (
          <CategoryTable sortKey={sortKey} vista={vista} />
        )}

        {vista === "compras" && <SalesTable sortKey={sortKey} />}
      </div>
    </div>
  );
};

export default AdminPanel;
