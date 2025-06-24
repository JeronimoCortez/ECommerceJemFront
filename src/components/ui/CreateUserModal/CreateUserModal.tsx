import { FC } from "react";
import { ICreateUsuario } from "../../../types/ICreateUsuario";
import { Role } from "../../../types/enums/Role.enum";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import useUser from "../../../hook/useUser";

type IPropsCreateUserModal = {
  onClose: VoidFunction;
};

const CreateUserModal: FC<IPropsCreateUserModal> = ({ onClose }) => {
  const { createUser } = useUser();

  const validationSchema = Yup.object({
    nombreCompleto: Yup.string().required("Ingrese el nombre completo"),
    email: Yup.string().email("Email inválido").required("Ingrese el email"),
    phone: Yup.string().required("Ingrese el teléfono"),
    dni: Yup.string().required("Ingrese el DNI"),
    contrasenia: Yup.string().required("Ingrese una contraseña"),
    repetirContrasenia: Yup.string()
      .oneOf([Yup.ref("contrasenia")], "Las contraseñas no coinciden")
      .required("Debe repetir la contraseña"),
    rol: Yup.mixed<Role>()
      .oneOf(Object.values(Role))
      .required("Seleccione un rol"),
  });

  const initialValues: ICreateUsuario & { repetirContrasenia: string } = {
    nombreCompleto: "",
    email: "",
    phone: "",
    dni: "",
    contrasenia: "",
    repetirContrasenia: "",
    rol: Role.USER,
  };

  return (
    <div className="fixed z-[999] top-0 left-0 w-full h-full bg-[#D9D9D9]/75 flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const { repetirContrasenia, ...createUserData } = values;
          await createUser(createUserData);
          onClose();
        }}
      >
        {({ values, handleChange, errors, touched, handleBlur }) => (
          <Form className="w-[50vw] bg-white rounded p-4 flex flex-col gap-2 justify-center">
            <h5 className="text-center font-bold">Crear usuario</h5>

            <div className="flex flex-col">
              <label htmlFor="nombreCompleto" className="text-xs font-bold">
                Nombre completo
              </label>
              <input
                type="text"
                id="nombreCompleto"
                name="nombreCompleto"
                value={values.nombreCompleto}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border border-gray-300 p-2 rounded ${
                  errors.nombreCompleto && touched.nombreCompleto
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-xs font-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border border-gray-300 p-2 rounded ${
                  errors.email && touched.email ? "border-red-500" : ""
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="dni" className="text-xs font-bold">
                DNI
              </label>
              <input
                type="text"
                name="dni"
                id="dni"
                value={values.dni}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border border-gray-300 p-2 rounded ${
                  errors.dni && touched.dni ? "border-red-500" : ""
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="text-xs font-bold">
                Teléfono
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border border-gray-300 p-2 rounded ${
                  errors.phone && touched.phone ? "border-red-500" : ""
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="rol" className="text-xs font-bold">
                Rol
              </label>
              <select
                name="rol"
                id="rol"
                value={values.rol}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border border-gray-300 p-2 rounded ${
                  errors.rol && touched.rol ? "border-red-500" : ""
                }`}
              >
                <option value={Role.ADMIN}>ADMIN</option>
                <option value={Role.USER}>USER</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="contrasenia" className="text-xs font-bold">
                Contraseña
              </label>
              <input
                type="password"
                name="contrasenia"
                id="contrasenia"
                value={values.contrasenia}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border border-gray-300 p-2 rounded ${
                  errors.contrasenia && touched.contrasenia
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="repetirContrasenia" className="text-xs font-bold">
                Repetir contraseña
              </label>
              <input
                type="password"
                name="repetirContrasenia"
                id="repetirContrasenia"
                value={values.repetirContrasenia}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border border-gray-300 p-2 rounded ${
                  errors.repetirContrasenia && touched.repetirContrasenia
                    ? "border-red-500"
                    : ""
                }`}
              />
              {errors.repetirContrasenia && touched.repetirContrasenia && (
                <p className="text-xs font-thin">{errors.repetirContrasenia}</p>
              )}
            </div>

            <div className="flex justify-center gap-2">
              <button
                className="bg-[#000] cursor-pointer px-4 py-2 text-white"
                type="submit"
              >
                Enviar
              </button>
              <button
                type="button"
                className="bg-[#5A0000] cursor-pointer px-4 py-2 text-white"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUserModal;
