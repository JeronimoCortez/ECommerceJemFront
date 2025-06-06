import { Icon } from "@iconify/react/dist/iconify.js";
import { FC } from "react";

type IPropsAdminButton = {
  view: string;
};

const AdminButton: FC<IPropsAdminButton> = ({ view }) => {
  return (
    <div className="bg-black w-full h-16 flex items-center justify-end px-4 sm:px-8">
      <button
        type="button"
        className="flex items-center justify-center gap-2 bg-white text-black rounded-full px-4 py-2 text-sm sm:text-base"
      >
        {view === "admin" ? "Admin" : "Usuario"}
        <Icon icon="fa6-regular:user" width="18" height="18" />
      </button>
    </div>
  );
};

export default AdminButton;
