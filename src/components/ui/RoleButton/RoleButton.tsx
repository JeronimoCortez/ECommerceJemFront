import { FC } from "react";
import useUser from "../../../hook/useUser";
import { IUsuario } from "../../../types/IUsuario";
import { Role } from "../../../types/enums/Role.enum";

interface RoleButtonProps {
  user: IUsuario;
}

const RoleButton: FC<RoleButtonProps> = ({ user }) => {
  const { modificarRolHook } = useUser();

  const onChange = () => {
    modificarRolHook(user.id);
  };

  return (
    <button
      onClick={onChange}
      className={`px-3 py-1 rounded text-sm text-white font-bold hover:cursor-pointer ${
        user.rol === Role.ADMIN ? "bg-yellow-600" : "bg-blue-600"
      }`}
    >
      {user.rol}
    </button>
  );
};

export default RoleButton;
