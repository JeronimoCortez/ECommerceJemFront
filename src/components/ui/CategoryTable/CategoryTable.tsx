import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { FC, useEffect, useState } from "react";
import NewButton from "../NewButton/NewButton";
import { ICategoria } from "../../../types/ICategoria";
import CreateCategory from "../CreateCategoryModal/CreateCategoryModal";
import { ITipo } from "../../../types/ITipo";
import useProduct from "../../../hook/useProduct";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";

interface Props {
  data: ICategoria[];
  sortKey: string;
  vista: string;
  tipos: ITipo[];
}

const CategoryTable: FC<Props> = ({ data, sortKey, vista, tipos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategoria | null>(
    null
  );

  const handleEditClick = (category: ICategoria) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { getProducts } = useProduct();

  useEffect(() => {
    loadMoreProducts();
  }, []);


  const loadMoreProducts = async () => {
    if (!hasMore) return;
    const data = await getProducts(page, 9);
    if (data) {
      setPage((prev) => prev + 1);
      setHasMore(!data.last);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    switch (sortKey) {
      case "Categoria":
        return a.nombre.localeCompare(b.nombre);
      case "Tipo":
        return a.tipo.nombre.localeCompare(b.tipo.nombre);
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
          {sortedData.map((u, i) => (
            <tr key={i}>
              <td className="p-2">{u.nombre}</td>
              <td>{u.tipo.nombre}</td>
              <td className="flex gap-2 mt-[14px]">
                <EditButton onClick={() => handleEditClick(u)} />
                {isModalOpen && (
                  <CreateCategory
                    tipos={tipos}
                    initialData={selectedCategory || undefined}
                    onClose={() => setIsModalOpen(false)}
                  />
                )}
                <DeleteButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ShowMoreButton showMore={loadMoreProducts} />
    </div>
  );
};

export default CategoryTable;