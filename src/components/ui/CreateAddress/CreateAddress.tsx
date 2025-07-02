import { FC } from "react";
import { IDireccion } from "../../../types/IDireccion";
import { ICreateDireccion } from "../../../types/ICreateDireccion";
import { Form, Formik } from "formik";
import useUser from "../../../hook/useUser";
import { DireccionService } from "../../../services/direccionService";
import { userStore } from "../../../store/userStore";
import * as Yup from "yup";

type ICreateAdress = {
  initialData?: IDireccion;
  onClose: VoidFunction;
};

const validationSchema = Yup.object({
  calle: Yup.string().required(),
  localidad: Yup.string().required(),
  cp: Yup.string().required(),
});

const CreateAddress: FC<ICreateAdress> = ({ onClose, initialData }) => {
  const { userActive } = userStore();
  const initialValues: ICreateDireccion = {
    calle: initialData?.calle || "",
    localidad: initialData?.localidad || "",
    cp: initialData?.cp || "",
  };
  const { añadirDireccionHook, editarDireccionUsuarioHook } = useUser();
  return (
    <div className="fixed inset-0 bg-[#D9D9D9]/75 flex items-center justify-center z-50">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => {
          if (initialData) {
            // const dataToSend: IDireccion = {
            //   ...values,
            //   id: initialData.id,
            //   activo: initialData.activo,
            // };
            // editarDireccionUsuarioHook(userActive!.id, dataToSend);
          } else {
            await añadirDireccionHook(userActive!.id, values as IDireccion);
          }

          onClose();
        }}
      >
        {({ values, handleChange, touched, errors }) => (
          <Form className="bg-[#fff] p-4 rounded">
            <h5 className="text-center font-bold">
              {initialData ? "Editar direccion" : "Crear direccion"}
            </h5>
            <label htmlFor="calle">Calle</label>
            <input
              type="text"
              id="calle"
              name="calle"
              value={values.calle}
              onChange={handleChange}
              className={`w-full p-2 border rounded mb-2 ${
                touched.calle && errors.calle
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <label htmlFor="localidad">Localidad</label>
            <input
              type="text"
              id="localidad"
              name="localidad"
              value={values.localidad}
              onChange={handleChange}
              className={`w-full p-2 border rounded mb-2 ${
                touched.localidad && errors.localidad
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <label htmlFor="cp">Codigo postal</label>
            <input
              type="text"
              id="cp"
              name="cp"
              value={values.cp}
              onChange={handleChange}
              className={`w-full p-2 border rounded mb-2 ${
                touched.cp && errors.cp ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div className="flex flex-col sm:flex-row gap-22 justify-center">
              <button
                type="submit"
                className="w-full sm:w-auto bg-black buttons text-white"
              >
                Guardar
              </button>
              <button
                onClick={onClose}
                type="button"
                className="w-full sm:w-auto bg-[#5A0000] buttons text-white"
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

export default CreateAddress;
