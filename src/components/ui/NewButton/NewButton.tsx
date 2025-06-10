import { useState } from "react";
import { Icon } from "@iconify/react";
import CreateProduct from "../CreateProduct/CreateProduct";
import CreateCategory from "../CreateCategoryModal/CreateCategoryModal";
import CreateUserModal from "../CreateUserModal/CreateUserModal";

interface Props {
  vista: string;
  onClick?: () => void;
}

const NewButton = ({ vista }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (!["productos", "usuarios", "categoria"].includes(vista)) return null;

  return (
    <div className="flex justify-center items-center mb-8">
      <button
        onClick={openModal}
        className="flex justify-around items-center bg-green-700 text-white px-6 py-2 rounded-full hover:cursor-pointer"
      >
        Nuevo
        <span className="ml-1">
          <Icon icon="ph:plus-fill" width="24" height="24" />
        </span>
      </button>

      {/* Se abre mal el modal, y no se puede cerrar */}
      {vista === "productos" && isOpen && <CreateProduct onClose={closeModal} />}
      {vista === "usuarios" && isOpen && <CreateUserModal onClose={closeModal} />}
      {/* Corregir el envio de props */}
      {/* {vista === "categoria" && isOpen && <CreateCategory onClose={closeModal} />} */}
    </div>
  );
};

export default NewButton;

