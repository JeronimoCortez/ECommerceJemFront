import { Icon } from "@iconify/react/dist/iconify.js";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

type IPropsAdminButton = {
  view: string;
};

const AdminButton: FC<IPropsAdminButton> = ({ view }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-black w-full h-16 flex items-center justify-end px-4 sm:px-8 ">
      <button
        type="button"
        onClick={() => {
          view === "admin" ? navigate("/") : navigate("/admin");
        }}
        className="cursor-pointer flex items-center justify-center gap-2 bg-white text-black rounded-full px-4 py-2 text-sm sm:text-base"
      >
        {view === "admin" ? "Usuario" : "Admin"}
        <Icon icon="fa6-regular:user" width="18" height="18" />
      </button>
    </div>
  );
};

export default AdminButton;
