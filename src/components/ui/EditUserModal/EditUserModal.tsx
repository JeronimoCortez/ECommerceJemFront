import { FC, useState } from "react";
import { IUpdateUser } from "../../../types/IUpdateUser";
import { IUsuario } from "../../../types/IUsuario";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Role } from "../../../types/enums/Role.enum";
import useUser from "../../../hook/useUser";

type IPropsEditUserModal = {
  onClose: VoidFunction;
  initialData: IUsuario;
};

const EditUserModal: FC<IPropsEditUserModal> = ({ onClose, initialData }) => {
  const { updateUser, changePassword } = useUser();
  const [isChangePassword, setChangePassword] = useState<boolean>(false);
  const validationSchema = Yup.object({
    nombreCompleto: Yup.string().required(),
    email: Yup.string().email("Formato inválido").required(),
    phone: Yup.string().required(),
    dni: Yup.string().required(),
    rol: Yup.string().required(),
    ...(isChangePassword && {
      contrasenia: Yup.string().required("Ingrese su contraseña actual"),
      nuevaContrasenia: Yup.string().required("Ingrese la nueva contraseña"),
      repetirContrasenia: Yup.string()
        .oneOf([Yup.ref("nuevaContrasenia")], "Las contraseñas no coinciden")
        .required("Debe repetir la contraseña"),
    }),
  });

  const initialValues: IUpdateUser & {
    contrasenia: string;
    nuevaContrasenia: string;
    repetirContrasenia: string;
  } = {
    nombreCompleto: initialData.nombreCompleto,
    email: initialData.email,
    dni: initialData.dni,
    phone: initialData.phone,
    rol: initialData.rol,
    contrasenia: "",
    nuevaContrasenia: "",
    repetirContrasenia: "",
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#D9D9D9]/75 flex justify-center items-center">
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          if (isChangePassword) {
            const {
              contrasenia,
              nuevaContrasenia,
              repetirContrasenia,
              ...restValues
            } = values;
            await changePassword(
              initialData.id,
              contrasenia!,
              nuevaContrasenia!
            );
            const updateData = { ...initialData, ...restValues };
            await updateUser(initialData.id, updateData);
          } else {
            const updateData = { ...initialData, ...values };
            await updateUser(initialData.id, updateData);
          }
          onClose();
        }}
      >
        {({ values, handleChange, errors, touched, handleBlur }) => (
          <Form className="w-[50vw] h-[70vh] bg-white rounded p-4 flex flex-col gap-2 justify-center">
            <h5 className="text-center font-bold">Editar usuario</h5>

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

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="checked"
                onClick={() => setChangePassword(!isChangePassword)}
              />
              <label htmlFor="checked">Cambiar contraseña</label>
            </div>
            {isChangePassword && (
              <>
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
                  <label
                    htmlFor="nuevaContrasenia"
                    className="text-xs font-bold"
                  >
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    name="nuevaContrasenia"
                    id="nuevaContrasenia"
                    value={values.nuevaContrasenia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border border-gray-300 p-2 rounded ${
                      errors.nuevaContrasenia && touched.nuevaContrasenia
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="repetirContrasenia"
                    className="text-xs font-bold"
                  >
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
                    <p className="text-xs font-thin text-red-500">
                      {errors.repetirContrasenia}
                    </p>
                  )}
                </div>
              </>
            )}

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

export default EditUserModal;
