import { useState, useEffect, FC } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { IUsuario } from "../../../types/IUsuario";

interface IOrderProps {
  user: IUsuario;
}

const Order: FC<IOrderProps> = ({ user }) => {
  const [selectedAddressId, setSelectedAddressId] = useState<number | "">("");

  const initialValues = {
    calle: "",
    localidad: "",
    cp: "",
    direccionSeleccionada: "",
  };

  const validationSchema = Yup.object({
    calle: Yup.string().required("La calle es obligatoria"),
    localidad: Yup.string().required("La localidad es obligatoria"),
    cp: Yup.string().required("El código postal es obligatorio"),
  });

  useEffect(() => {
    // Cargar por ID si hace falta
  }, []);

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
          <div className="min-h-screen flex flex-col items-center justify-center bg-white mt-20 mb-20">
            <div className="bg-white shadow drop-shadow-lg p-6 rounded-md w-[620px] relative">
              <h2 className="text-black mb-4">Envío</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    name="calle"
                    value={values.calle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Calle*"
                    className="border border-gray-300 p-2 rounded placeholder-black w-full"
                  />
                  {touched.calle && errors.calle && (
                    <div className="text-red-500 text-sm">{errors.calle}</div>
                  )}
                </div>
                <div>
                  <select
                    name="direccionSeleccionada"
                    value={selectedAddressId}
                    onChange={(e) => {
                      const id =
                        e.target.value === "" ? "" : parseInt(e.target.value);
                      setSelectedAddressId(id);
                      setFieldValue("direccionSeleccionada", id);
                      const selected = user.direcciones.find(
                        (d) => d.id === id
                      );
                      if (selected) {
                        setFieldValue("calle", selected.calle);
                        setFieldValue("localidad", selected.localidad);
                        setFieldValue("cp", selected.cp);
                      } else {
                        setFieldValue("calle", "");
                        setFieldValue("localidad", "");
                        setFieldValue("cp", "");
                      }
                    }}
                    className="w-full p-3 border border-gray-300 rounded"
                  >
                    <option value="">Seleccione una dirección existente</option>
                    {user.direcciones.map((dir) => (
                      <option key={dir.id} value={dir.id}>
                        {`${dir.calle}, ${dir.localidad}, CP ${dir.cp}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    name="localidad"
                    value={values.localidad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Localidad*"
                    className="border border-gray-300 p-2 rounded placeholder-black w-full"
                  />
                  {touched.localidad && errors.localidad && (
                    <div className="text-red-500 text-sm">
                      {errors.localidad}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    name="cp"
                    value={values.cp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Código Postal*"
                    className="border border-gray-300 p-2 rounded placeholder-black w-full"
                  />
                  {touched.cp && errors.cp && (
                    <div className="text-red-500 text-sm">{errors.cp}</div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center mt-4">
                <button
                  type="submit"
                  className="bg-black text-white py-1 w-48 rounded-full"
                >
                  Realizar Pago
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Order;
