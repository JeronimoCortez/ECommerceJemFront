import { userStore } from "../../../store/userStore";
import { IEditProfileUser } from "../../../types/IEditProfileUser";

const EditProfileUser = () => {
  const { userActive } = userStore();
  const initialValues: IEditProfileUser = {
    email: userActive?.email || "",
    nombre: userActive?.nombreCompleto || "",
    dni: userActive?.dni || "",
    phone: userActive?.phone || "",
  };

  return <div></div>;
};

export default EditProfileUser;
