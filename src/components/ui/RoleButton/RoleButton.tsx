import { FC } from "react";
import useUser from "../../../hook/useUser";
import { IUsuario } from "../../../types/IUsuario";
import { Role } from "../../../types/enums/Role.enum";

interface RoleButtonProps {
  user: IUsuario;
}

const RoleButton: FC<RoleButtonProps> = ({ user }) => {
  const { updateUserRole } = useUser();

  const onChange = () => {
    const newRole = user.rol === Role.ADMIN ? Role.USER : Role.ADMIN;
    updateUserRole(user.id, newRole);
  };

  return (
    <button
      onClick={onChange}
      className={`px-3 py-1 rounded text-white text-sm  hover:cursor-pointer${
        user.rol === Role.ADMIN ? "bg-yellow-600" : "bg-blue-600"
      }`}
    >
      {user.rol}
    </button>
  );
};

export default RoleButton;
