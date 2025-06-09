import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";

interface Usuario {
  nombre: string;
  id: string;
  mail: string;
}

interface Props {
  data: Usuario[];
  sortKey: string;
}

const UserTable: React.FC<Props> = ({ data, sortKey }) => {
  const sortedData = [...data].sort((a, b) => {
    switch (sortKey) {
      case "Usuario":
        return a.nombre.localeCompare(b.nombre);
      case "ID":
        return a.id.localeCompare(b.id);
      case "Mail":
        return a.mail.localeCompare(b.mail);
      default:
        return 0;
    }
  });

  return (
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
            <td className="p-2">{u.nombre}</td>
            <td>{u.id}</td>
            <td>{u.mail}</td>
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

export default UserTable;
