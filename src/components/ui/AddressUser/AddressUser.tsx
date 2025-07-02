import { Icon } from "@iconify/react/dist/iconify.js";
import { userStore } from "../../../store/userStore";
import { useEffect, useState } from "react";
import CreateAddress from "../CreateAddress/CreateAddress";
import EditButton from "../EditButton/EditButton";
import { IDireccion } from "../../../types/IDireccion";

const AddressUser = () => {
  const { userActive } = userStore();
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [addressActive, setAddressActive] = useState<IDireccion>();

  useEffect(() => {
    console.log(userActive);
  });

  return (
    <div className="w-[70vw]">
      {userActive!.direcciones.length > 0 ? (
        userActive!.direcciones.map((d) => (
          <div className="flex justify-between items-center w-full p-2 border border-[#D9D9D9] my-1 rounded">
            <p>{d.calle}</p>
            <p>{d.localidad}</p>
            <p>{d.cp}</p>
            {/* <EditButton
              onClick={() => {
                setOpenModalEdit(true);
                setAddressActive(d);
              }}
            /> */}
          </div>
        ))
      ) : (
        <p>No tiene direcciones asociadas</p>
      )}
      <button
        onClick={() => setOpenModal(true)}
        className="bg-[#000] flex mx-auto cursor-pointer mt-2 w-[200px] p-1.5 text-white"
      >
        <Icon icon="ri:add-line" width="24" height="24" />
        Añadir nueva direccion
      </button>
      {openModal && <CreateAddress onClose={() => setOpenModal(false)} />}
      {/* {openModalEdit && addressActive && (
        <CreateAddress
          initialData={addressActive}
          onClose={() => {
            setOpenModalEdit(false);
            setAddressActive(undefined);
          }}
        />
      )} */}
    </div>
  );
};

export default AddressUser;
