import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FC } from "react";
import { ICategoria } from "../../../types/ICategoria";
import { ITipo } from "../../../types/ITipo";

interface CreateCategoryProps {
  initialData?: ICategoria;
  onClose: VoidFunction;
}

const CreateCategory: FC<CreateCategoryProps> = ({ initialData, onClose }) => {
  const initialValues: ICategoria = initialData ?? {
    id: 0,
    activo: true,
    nombre: "",
    tipo: "",
    productos: [],
  };

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required("Ingrese un nombre")
      .min(2, "Debe tener al menos 2 caracteres"),
    tipo: Yup.object().required("Seleccione un tipo"),
  });

  return (
    <div className="fixed inset-0 bg-[#D9D9D9]/75 flex items-center justify-center z-50">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Enviado con:", values);
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, setFieldValue, touched, errors }) => (
          <Form>
            <div className="flex flex-col min-h-screen items-center justify-center px-4 py-8">
              <div className="w-full max-w-md border border-black p-6 bg-white">
                <div className="text-center text-1xl font-bold mb-4">
                  <h1>
                    {initialData ? "Editar Categoría" : "Crear Categoría"}
                  </h1>
                </div>

                {/* Nombre */}
                <input
                  type="text"
                  name="nombre"
                  value={values.nombre}
                  placeholder="Nombre:"
                  onChange={handleChange}
                  className={`w-full p-2 border rounded mb-2 ${
                    touched.nombre && errors.nombre
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {/* Tipo */}
                <select
                  name="tipo"
                  value={values.tipo.id}
                  onChange={(e) => {
                    const selectedTipo = tipos.find(
                      (t) => t.id === Number(e.target.value)
                    );
                    setFieldValue("tipo", selectedTipo);
                  }}
                  className={`w-full p-2 border rounded mb-4 ${
                    touched.tipo && errors.tipo
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  {tipos.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>

                {/* Botones */}
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
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCategory;
