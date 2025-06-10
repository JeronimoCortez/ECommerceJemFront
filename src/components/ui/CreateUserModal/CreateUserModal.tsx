import { useState, FC } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { IUsuario } from "../../../types/IUsuario";

interface CreateUserModalProps {
  initialData?: IUsuario;
  onClose: VoidFunction;
}

const CreateUserModal: FC<CreateUserModalProps> = ({ initialData, onClose }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const initialValues: IUsuario & {firstName:string, lastName:string} = initialData ? {
    id: 0,
    userName: "",
    email: "",
    rol: "",
    dni: "",
    phone: "",
    direcciones: [],
    ordenes: [],
    firstName: "",
    lastName: "",
  }: initialData;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Nombre es requerido"),
    lastName: Yup.string().required("Apellido es requerido"),
    dni: Yup.string()
      .matches(/^\d+$/, "DNI debe contener solo números")
      .required("DNI es requerido"),
    phone: Yup.string().required("Teléfono es requerido"),
    email: Yup.string().email("Email inválido").required("Email es requerido"),
  });

  const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string().required("Contraseña actual es requerida"),
    newPassword: Yup.string()
      .notOneOf([Yup.ref('currentPassword')], "La nueva contraseña debe ser diferente a la actual")
      .required("Nueva contraseña es requerida"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], "Las contraseñas no coinciden")
      .required("Repetir contraseña es requerido"),
  });

  return (
    <div className="fixed inset-0 bg-[#D9D9D9]/75 flex items-center justify-center z-50">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Form submitted", values);
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, touched, errors }) => (
          <>
            <Form>
              <div className="bg-white shadow drop-shadow-lg p-6 rounded-md w-[620px] relative">
                <div className="flex items-center justify-center mb-6">
                  <div className="text-black">
                    {initialData ? "Editar Datos Personales" : "Crear Nuevo Usuario"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Nombre */}
                  <div>
                    <input
                      name="firstName"
                      placeholder="Nombre*"
                      className={`border border-gray-300 p-2 rounded placeholder-black w-full ${
                        touched.firstName && errors.firstName ? "border-red-500" : ""
                      }`}
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    {touched.firstName && errors.firstName && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.firstName}
                      </div>
                    )}
                  </div>

                  {/* DNI */}
                  <div>
                    <input
                      name="dni"
                      placeholder="DNI (sin puntos ni espacios)*"
                      className={`border border-gray-300 p-2 rounded placeholder-black w-full ${
                        touched.dni && errors.dni ? "border-red-500" : ""
                      }`}
                      value={values.dni}
                      onChange={handleChange}
                    />
                    {touched.dni && errors.dni && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.dni}
                      </div>
                    )}
                  </div>

                  {/* Apellido */}
                  <div>
                    <input
                      name="lastName"
                      placeholder="Apellido*"
                      className={`border border-gray-300 p-2 rounded placeholder-black w-full ${
                        touched.lastName && errors.lastName ? "border-red-500" : ""
                      }`}
                      value={values.lastName}
                      onChange={handleChange}
                    />
                    {touched.lastName && errors.lastName && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.lastName}
                      </div>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <input
                      name="phone"
                      placeholder="Teléfono*"
                      className={`border border-gray-300 p-2 rounded placeholder-black w-full ${
                        touched.phone && errors.phone ? "border-red-500" : ""
                      }`}
                      value={values.phone}
                      onChange={handleChange}
                    />
                    {touched.phone && errors.phone && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      name="email"
                      placeholder="Correo electrónico*"
                      className={`border border-gray-300 p-2 rounded placeholder-black w-full ${
                        touched.email && errors.email ? "border-red-500" : ""
                      }`}
                      value={values.email}
                      onChange={handleChange}
                    />
                    {touched.email && errors.email && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center mt-6 space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(true)}
                    className="text-black py-1 hover:underline"
                  >
                    Cambiar Contraseña
                  </button>
                </div>

                <div className="flex items-center justify-center mt-4 space-x-4">
                  <button
                    type="submit"
                    className="bg-black text-white py-1 w-48 rounded-full"
                  >
                    {initialData ? "Actualizar" : "Crear"}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-[#5A0000] text-white py-1 w-48 rounded-full"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </Form>

            {/* Modal de Contraseña */}
            {showPasswordModal && (
              <Formik
                initialValues={{
                  currentPassword: "",
                  newPassword: "",
                  repeatPassword: ""
                }}
                validationSchema={passwordValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  console.log("Password changed", values);
                  setSubmitting(false);
                  setShowPasswordModal(false);
                }}
              >
                {({ values, handleChange, touched, errors }) => (
                  <div className="fixed inset-0 bg-[#D9D9D9]/75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-md shadow-lg p-6 w-60 space-y-4">
                      <div className="text-center">Cambiar Contraseña</div>
                      <Form>
                        {/* Contraseña Actual */}
                        <div>
                          <input
                            type="password"
                            name="currentPassword"
                            placeholder="Contraseña Actual*"
                            className={`w-full p-1 border rounded ${
                              touched.currentPassword && errors.currentPassword ? "border-red-500" : "border-gray-300"
                            }`}
                            value={values.currentPassword}
                            onChange={handleChange}
                          />
                          {touched.currentPassword && errors.currentPassword && (
                            <div className="text-red-500 text-xs mt-1">
                              {errors.currentPassword}
                            </div>
                          )}
                        </div>

                        {/* Nueva Contraseña */}
                        <div>
                          <input
                            type="password"
                            name="newPassword"
                            placeholder="Nueva Contraseña*"
                            className={`w-full p-1 border rounded ${
                              touched.newPassword && errors.newPassword ? "border-red-500" : "border-gray-300"
                            }`}
                            value={values.newPassword}
                            onChange={handleChange}
                          />
                          {touched.newPassword && errors.newPassword && (
                            <div className="text-red-500 text-xs mt-1">
                              {errors.newPassword}
                            </div>
                          )}
                        </div>

                        {/* Repetir Contraseña */}
                        <div>
                          <input
                            type="password"
                            name="repeatPassword"
                            placeholder="Repetir Contraseña*"
                            className={`w-full p-1 border rounded ${
                              touched.repeatPassword && errors.repeatPassword ? "border-red-500" : "border-gray-300"
                            }`}
                            value={values.repeatPassword}
                            onChange={handleChange}
                          />
                          {touched.repeatPassword && errors.repeatPassword && (
                            <div className="text-red-500 text-xs mt-1">
                              {errors.repeatPassword}
                            </div>
                          )}
                        </div>

                        <div className="flex justify-center gap-2">
                          <button
                            type="submit"
                            className="bg-black text-white py-1 px-4 rounded-full"
                          >
                            Cambiar
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowPasswordModal(false)}
                            className="bg-[#5A0000] text-white py-1 px-4 rounded-full"
                          >
                            Cancelar
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                )}
              </Formik>
            )}
          </>
        )}
      </Formik>
    </div>
  );
};

export default CreateUserModal;