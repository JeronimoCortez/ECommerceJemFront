import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { FC, useEffect, useState } from "react";
import NewButton from "../NewButton/NewButton";
import { IUsuario } from "../../../types/IUsuario";
import useUser from "../../../hook/useUser";
import { userStore } from "../../../store/userStore";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
import RoleButton from "../RoleButton/RoleButton";
import CreateUserModal from "../CreateUserModal/CreateUserModal";
import EditUserModal from "../EditUserModal/EditUserModal";
import Search from "../Search/Search";

interface Props {
  sortKey: string;
  vista: string;
}

const UserTable: FC<Props> = ({ sortKey, vista }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { getUsers, deleteUserById, altaUsuario } = useUser();
  const { users, appendUsers } = userStore();
  const [userToEdit, setUserToEdit] = useState<IUsuario | null>(null);

  const handleEditClick = (user: IUsuario) => {
    setUserToEdit(user);
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

  return (
    <div className="mt-2">
      <Search />
      <NewButton vista={vista} />

      <table className="w-full text-left">
        <thead className="bg-black text-white">
          <tr>
            <th>ID</th>
            <th>Mail</th>
            <th>Nombre completo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className={`${u.activo ? "" : "bg-red-500"}`}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.nombreCompleto}</td>
              <td className="flex gap-2 mt-[14px]">
                <EditButton onClick={() => handleEditClick(u)} />

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
      {isModalOpen && userToEdit && (
        <EditUserModal
          onClose={() => setIsModalOpen(false)}
          initialData={userToEdit}
        />
      )}
      <ShowMoreButton showMore={loadMoreUsers} />
    </div>
  );
};

export default UserTable;
