import { FC, useEffect, useRef } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Props {
  onClose: () => void;
  onSubmit: (values: {
    contraseñaActual: string;
    nuevaContraseña: string;
  }) => void;
}

const ChangePasswordModal: FC<Props> = ({ onClose, onSubmit }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-md shadow-lg p-6 w-72 space-y-4"
      >
        <h2 className="text-center font-semibold">Cambiar Contraseña</h2>
        <Formik
          initialValues={{
            contraseñaActual: "",
            nuevaContraseña: "",
            repetirContraseña: "",
          }}
          validationSchema={Yup.object({
            contraseñaActual: Yup.string().required("Obligatorio"),
            nuevaContraseña: Yup.string()
              .min(6, "Mínimo 6 caracteres")
              .required("Obligatorio"),
            repetirContraseña: Yup.string()
              .oneOf([Yup.ref("nuevaContraseña")], "No coinciden")
              .required("Obligatorio"),
          })}
          onSubmit={(values) => {
            onSubmit({
              contraseñaActual: values.contraseñaActual,
              nuevaContraseña: values.nuevaContraseña,
            });
            onClose();
          }}
        >
          {({ handleChange, values, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="password"
                  name="contraseñaActual"
                  placeholder="Contraseña Actual*"
                  className="w-full p-1 border border-gray-300 rounded"
                  onChange={handleChange}
                  value={values.contraseñaActual}
                />
                <ErrorMessage
                  name="contraseñaActual"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="nuevaContraseña"
                  placeholder="Nueva Contraseña*"
                  className="w-full p-1 border border-gray-300 rounded"
                  onChange={handleChange}
                  value={values.nuevaContraseña}
                />
                <ErrorMessage
                  name="nuevaContraseña"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="repetirContraseña"
                  placeholder="Repetir Contraseña*"
                  className="w-full p-1 border border-gray-300 rounded"
                  onChange={handleChange}
                  value={values.repetirContraseña}
                />
                <ErrorMessage
                  name="repetirContraseña"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white rounded-full py-1"
              >
                Cambiar Contraseña
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePasswordModal;