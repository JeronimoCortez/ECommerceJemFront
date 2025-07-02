import { Form, Formik } from "formik";
import { userStore } from "../../../store/userStore";
import { IEditProfileUser } from "../../../types/IEditProfileUser";
import * as Yup from "yup";
import useUser from "../../../hook/useUser";
import { useLocation, useNavigate } from "react-router-dom";
const validationSchema = Yup.object({
  nombre: Yup.string().required(),
  dni: Yup.string().required(),
  phone: Yup.string().required(),
});

const EditProfileUser = () => {
  const { userActive } = userStore();
  const { editProfileHook } = useUser();
  const initialValues: IEditProfileUser = {
    nombre: userActive?.nombreCompleto || "",
    dni: userActive?.dni || "",
    phone: userActive?.phone || "",
  };
  const location = useLocation();
  const navigate = useNavigate();

  const recargar = () => {
    navigate(location.pathname, { replace: true });
  };

  return (
    <div>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          console.log(userActive);
          editProfileHook(userActive!.id, values);
          recargar();
        }}
      >
        {({ values, handleChange, touched, errors }) => (
          <Form className="flex flex-col justify-center mx-auto mt-2 w-[70vw] gap-1">
            <label>Email</label>
            <p className="border border-gray-500 rounded p-1">
              {userActive?.email || "Sin email"}
            </p>

            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              onChange={handleChange}
              value={values.nombre}
              className={`${
                touched.nombre && errors.nombre
                  ? "border border-red-500 rounded p-1"
                  : "border border-[#D9D9D9]/75 rounded p-1"
              }`}
            />
            <label htmlFor="dni">Dni</label>
            <input
              id="dni"
              type="text"
              onChange={handleChange}
              value={values.dni}
              className={`${
                touched.dni && errors.dni
                  ? "border border-red-500 rounded p-1"
                  : "border border-[#D9D9D9]/75 rounded p-1"
              }`}
            />
            <label htmlFor="phone">Telefono</label>
            <input
              id="phone"
              type="text"
              onChange={handleChange}
              value={values.phone}
              className={`${
                touched.phone && errors.phone
                  ? "border border-red-500 rounded p-1"
                  : "border border-[#D9D9D9]/75 rounded p-1"
              }`}
            />
            <button
              type="submit"
              className="bg-[#000] mx-auto cursor-pointer mt-2 w-[200px] p-2 text-white"
            >
              Enviar cambios
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfileUser;
