import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { FC, useEffect, useState } from "react";
import NewButton from "../NewButton/NewButton";
import { IUsuario } from "../../../types/IUsuario";
import CreateUserModal from "../CreateUserModal/CreateUserModal";
import useProduct from "../../../hook/useProduct";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";

interface Props {
  data: IUsuario[];
  sortKey: string;
  vista: string;
}

const UserTable: FC<Props> = ({ data, sortKey, vista }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IUsuario | null>(null);

  const handleEditClick = (product: IUsuario) => {
    setSelectedProduct(product);
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
      case "Usuario":
        return a.userName.localeCompare(b.userName);
      case "ID":
        return a.id - b.id;
      case "Mail":
        return a.email.localeCompare(b.email);
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
            <th className="p-2">Usuario</th>
            <th>ID</th>
            <th>Mail</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((u, i) => (
            <tr key={i}>
              <td className="p-2">{u.userName}</td>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td className="flex gap-2 mt-[14px]">
                <EditButton onClick={() => handleEditClick} />
                {isModalOpen && selectedProduct && (
                  <CreateUserModal onClose={() => setIsModalOpen(false)} />
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

export default UserTable;