import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { FC, useEffect, useState } from "react";
import NewButton from "../NewButton/NewButton";
import { IUsuario } from "../../../types/IUsuario";
import CreateUserModal from "../CreateUserModal/CreateUserModal";
import useUser from "../../../hook/useUser";
import { orderStore } from "../../../store/orderStore";
import { userStore } from "../../../store/userStore";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
import RoleButton from "../RoleButton/RoleButton";

interface Props {
  sortKey: string;
  vista: string;
}

const UserTable: FC<Props> = ({ sortKey, vista }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IUsuario | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { getUsers, deleteUserById, altaUsuario } = useUser();
  const { users, appendUsers } = userStore();

  const handleEditClick = (product: IUsuario) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    loadMoreUsers();
  }, []);

  const loadMoreUsers = async () => {
    const data = await getUsers(page, 9);
    console.log("Usuarios:", data);

    if (data) {
      appendUsers(data.content);
      setPage(page + 1);
      setHasMore(!data.last);
    }
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUserById(id);
  };

  const sortedData = [...users].sort((a, b) => {
    switch (sortKey) {
      case "Usuario":
        return a.email.toString().localeCompare(b.email.toString());
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
            <th>ID</th>
            <th>Mail</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className={`${u.activo ? "" : "bg-red-500"}`}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td className="flex gap-2 mt-[14px]">
                {/* <EditButton onClick={() => handleEditClick} />
                {isModalOpen && selectedProduct && (
                  <CreateUserModal onClose={() => setIsModalOpen(false)} />
                )} */}
                {u.activo ? (
                  <DeleteButton onClick={() => handleDeleteUser(u.id)} />
                ) : (
                  <button
                    onClick={() => altaUsuario(u.id)}
                    className="cursor-pointer font-bold"
                  >
                    Dar alta
                  </button>
                )}
                <RoleButton user={u} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ShowMoreButton showMore={loadMoreUsers} />
    </div>
  );
};

export default UserTable;
