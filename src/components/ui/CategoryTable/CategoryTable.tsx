import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { FC, useEffect, useState } from "react";
import NewButton from "../NewButton/NewButton";
import { ICategoria } from "../../../types/ICategoria";
import CreateCategory from "../CreateCategoryModal/CreateCategoryModal";
import { categoriaStore } from "../../../store/categoriaStore";
import useCategoria from "../../../hook/useCategoria";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";

interface Props {
  sortKey: string;
  vista: string;
}

const CategoryTable: FC<Props> = ({ sortKey, vista }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategoria | null>(
    null
  );
  const { categorias } = categoriaStore();
  const { getCategoriesPage, deleteCategoryHook, altaCategoria } =
    useCategoria();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadMoreCategorias();
  }, []);

  const loadMoreCategorias = async () => {
    if (!hasMore) return;
    const data = await getCategoriesPage(page, 9);
    if (data) {
      setPage((prev) => prev + 1);
      setHasMore(!data.last);
    }
  };

  const handleEditClick = (category: ICategoria) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const sortedData = [...categorias].sort((a, b) => {
    switch (sortKey) {
      case "Categoria":
        return a.nombre.toString().localeCompare(b.nombre.toString());
      case "Tipo":
        return (a.tipo?.nombre || "").localeCompare(b.tipo?.nombre || "");
      default:
        return 0;
    }
  });

  return (
    <div className="mt-2">
      <NewButton
        vista={vista}
        onClick={() => {
          setSelectedCategory(null);
          setIsModalOpen(true);
        }}
      />

      <table className="w-full text-left">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-2">Categoria</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((c, i) => (
            <tr key={i} className={`${c.activo ? "" : "bg-red-500"}`}>
              <td className="p-2">{c.nombre}</td>
              <td>{c.tipo?.nombre || "Sin tipo "}</td>
              <td>{c.activo ? "SI" : "NO"}</td>
              <td className="flex gap-2 mt-[14px]">
                {c.activo ? (
                  <>
                    <EditButton onClick={() => handleEditClick(c)} />
                    <DeleteButton onClick={() => deleteCategoryHook(c.id)} />
                    {isModalOpen && (
                      <CreateCategory
                        initialData={selectedCategory || undefined}
                        onClose={() => setIsModalOpen(false)}
                      />
                    )}
                  </>
                ) : (
                  <button
                    className="font-bold text-center cursor-pointer"
                    onClick={() => altaCategoria(c.id)}
                  >
                    Activar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ShowMoreButton showMore={loadMoreCategorias} />
    </div>
  );
};

export default CategoryTable;
