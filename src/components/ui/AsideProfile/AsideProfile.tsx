import { useState } from "react";
import EditProfileUser from "../EditProfileUser/EditProfileUser";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import AddressUser from "../AddressUser/AddressUser";

const AsideProfile = () => {
  const [selectedSeccion, setSelectedSeccion] = useState("");

  const handleSelectSection = (section: string) => {
    setSelectedSeccion(section);
  };

  return (
    <div className="flex gap-4">
      <div className="flex w-[20vw] flex-col bg-[#D9D9D9]/50 h-[100vh] p-1 gap-2">
        <p
          className={`${
            selectedSeccion === "perfil" && "bg-[#D9D9D9] w-full p-1 rounded "
          } cursor-pointer`}
          onClick={() => handleSelectSection("perfil")}
        >
          Mi perfil
        </p>
        <p
          className={`${
            selectedSeccion === "direccion" &&
            "bg-[#D9D9D9] w-full p-1 rounded "
          } cursor-pointer`}
          onClick={() => handleSelectSection("direccion")}
        >
          Mis direcciones
        </p>
        <p
          className={`${
            selectedSeccion === "contraseña" &&
            "bg-[#D9D9D9] w-full p-1 rounded "
          } cursor-pointer`}
          onClick={() => handleSelectSection("contraseña")}
        >
          Cambiar contraseña
        </p>
      </div>
      {selectedSeccion === "perfil" && <EditProfileUser />}
      {selectedSeccion === "direccion" && <AddressUser />}
      {selectedSeccion === "contraseña" && <ChangePasswordModal />}
    </div>
  );
};

export default AsideProfile;
