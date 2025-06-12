import { useState, useRef, useEffect, FC } from "react";
import JEMBar from "../JEMBar/JEMBar";
import LoginBar from "../LoginBar/LoginBar";
import UpArrow from "../UpArrow/UpArrow";
import { IUsuario } from "../../../types/IUsuario";
import { Form, Formik, FormikErrors } from "formik";
import * as Yup from "yup";
import { Role } from "../../../types/enums/Role.enum";
import { IDireccion } from "../../../types/IDireccion";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import { Estado } from "../../../types/enums/Estado.enum";

interface EditProfileUserProps {
  initialData?: IUsuario;
}

const EditProfileUser: FC<EditProfileUserProps> = ({ initialData }) => {
  const [addressOpen, setAddressOpen] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);
  const addressRef = useRef<HTMLDivElement>(null);
  const pwdRef = useRef<HTMLDivElement>(null);

  const initialValues: IUsuario = initialData ?? {
    id: 0,
    activo: true,
    userName: "",
    email: "",
    rol: Role.USER,
    dni: "",
    phone: "",
    direcciones: [
      {
        id: 1,
        activo: true,
        calle: "",
        localidad: "",
        cp: "",
      },
    ],
    ordenes: [
      {
        id: 1,
        activo: true,
        fecha: new Date(),
        precioTotal: 0,
        estado: Estado.PENDIENTE,
        usuario: undefined,
        detalles: [],
      },
    ],
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("El nombre es obligatorio"),
    apellido: Yup.string().required("El apellido es obligatorio"),
    dni: Yup.string()
      .matches(/^\d+$/, "El DNI debe contener solo números")
      .required("El DNI es obligatorio"),
    phone: Yup.string().required("El teléfono es obligatorio"),
    email: Yup.string()
      .email("Correo inválido")
      .required("El correo es obligatorio"),
    direccion: Yup.object({
      localidad: Yup.string().required("La localidad es obligatoria"),
      calle: Yup.string().required("La calle es obligatoria"),
      codigoPostal: Yup.string().required("El código postal es obligatorio"),
    }),
    password: Yup.object({
      actual: Yup.string().required("Ingrese su contraseña actual"),
      nueva: Yup.string()
        .min(6, "Mínimo 6 caracteres")
        .required("Ingrese una nueva contraseña"),
      repetir: Yup.string()
        .oneOf([Yup.ref("nueva")], "Las contraseñas no coinciden")
        .required("Repita la contraseña nueva"),
    }),
  });

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        addressOpen &&
        addressRef.current &&
        !addressRef.current.contains(e.target as Node)
      ) {
        setAddressOpen(false);
      }
      if (
        pwdOpen &&
        pwdRef.current &&
        !pwdRef.current.contains(e.target as Node)
      ) {
        setPwdOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [addressOpen, pwdOpen]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Datos enviados: ", values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit}>
          <div>
            {/* <JEMBar />
            <LoginBar /> */}
            <div className="min-h-screen flex flex-col items-center justify-center bg-white mt-20 mb-20">
              <div className="bg-white shadow drop-shadow-lg p-6 rounded-md w-[620px] relative">
                <div className="flex items-center justify-center mb-6">
                  <div className="text-black">Editar Datos Personales</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      name="userName"
                      value={values.userName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="User Name"
                      className="border border-gray-300 p-2 rounded placeholder-black"
                    />
                    {touched.userName && errors.userName && (
                      <div className="text-red-500 text-sm">
                        {errors.userName}
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      name="dni"
                      value={values.dni}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="DNI(sin puntos ni espacios)*"
                      className="border border-gray-300 p-2 rounded placeholder-black"
                    />
                    {touched.dni && errors.dni && (
                      <div className="text-red-500 text-sm">{errors.dni}</div>
                    )}
                  </div>
                  <div>
                    <input
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Teléfono*"
                      className="border border-gray-300 p-2 rounded placeholder-black"
                    />
                    {touched.phone && errors.phone && (
                      <div className="text-red-500 text-sm">{errors.phone}</div>
                    )}
                  </div>
                  <div>
                    <input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Correo electrónico*"
                      className="border border-gray-300 p-2 rounded placeholder-black"
                    />
                    {touched.email && errors.email && (
                      <div className="text-red-500 text-sm">{errors.email}</div>
                    )}
                  </div>

                  <div className="relative" ref={addressRef}>
                    <button
                      onClick={() => setAddressOpen((o) => !o)}
                      className="w-full flex items-center justify-between border border-gray-300 p-2 rounded bg-white"
                    >
                      Dirección*
                      <div
                        className={`transform transition-transform duration-300 ${
                          addressOpen ? "rotate-180" : ""
                        }`}
                      >
                        <UpArrow />
                      </div>
                    </button>
                    {addressOpen && (
                      <div className="absolute top-full left-0 bg-white p-4 border border-gray-300 rounded-md shadow-md w-full ">
                        <input
                          name="direcciones[0].localidad"
                          value={values.direcciones[0].localidad}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Localidad*"
                          className="w-full mb-2 p-2 border border-gray-300 rounded"
                        />
                        {touched.direcciones?.[0]?.localidad &&
                          typeof errors.direcciones?.[0] === "object" &&
                          errors.direcciones?.[0]?.localidad && (
                            <div className="text-red-500 text-sm">
                              {
                                (
                                  errors
                                    .direcciones[0] as FormikErrors<IDireccion>
                                ).localidad
                              }
                            </div>
                          )}
                        <input
                          name="direcciones[0].calle"
                          value={values.direcciones[0].calle}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Calle*"
                          className="w-full mb-2 p-2 border border-gray-300 rounded"
                        />
                        {touched.direcciones?.[0]?.calle &&
                          typeof errors.direcciones?.[0] === "object" &&
                          errors.direcciones?.[0]?.calle && (
                            <div className="text-red-500 text-sm">
                              {
                                (
                                  errors
                                    .direcciones[0] as FormikErrors<IDireccion>
                                ).calle
                              }
                            </div>
                          )}
                        <input
                          name="direcciones[0].cp"
                          value={values.direcciones[0].cp}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Código Postal*"
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                        {touched.direcciones?.[0]?.cp &&
                          typeof errors.direcciones?.[0] === "object" &&
                          errors.direcciones?.[0]?.cp && (
                            <div className="text-red-500 text-sm">
                              {
                                (
                                  errors
                                    .direcciones[0] as FormikErrors<IDireccion>
                                ).cp
                              }
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center mt-6 space-x-4">
                  <button
                    onClick={() => setPwdOpen(true)}
                    className="text-black py-1 hover:underline"
                  >
                    Cambiar Contraseña
                  </button>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <button className="bg-black text-white py-1 w-48 rounded-full">
                    Continuar
                  </button>
                </div>
              </div>
            </div>
            {pwdOpen && (
              <ChangePasswordModal
                onClose={() => setPwdOpen(false)}
                onSubmit={({ contraseñaActual, nuevaContraseña }) => {
                  console.log("Password actual: ", contraseñaActual);
                  console.log("Password nueva: ", nuevaContraseña);
                }}
              />
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditProfileUser;
