import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FC } from "react";
import { ICategoria } from "../../../types/ICategoria";
import useCategoria from "../../../hook/useCategoria";
import { ICreateCategoria } from "../../../types/ICreateCategoria";
import { CategoriaService } from "../../../services/categoriaService";
import { TipoService } from "../../../services/tipoService";
import { ITipo } from "../../../types/ITipo";

interface CreateCategoryProps {
  initialData?: ICategoria;
  onClose: VoidFunction;
}

const CreateCategory: FC<CreateCategoryProps> = ({ initialData, onClose }) => {
  const categoriaService = new CategoriaService();
  const { createCategory, updateCategory } = useCategoria();
  const initialValues: ICreateCategoria | ICategoria = {
    nombre: initialData?.nombre || "",
    nombreTipo: initialData?.tipo?.nombre ?? "",
  };

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required("Ingrese un nombre")
      .min(2, "Debe tener al menos 2 caracteres"),
    nombreTipo: Yup.string().required("Seleccione un tipo"),
  });

  const tipoService = new TipoService();

  return (
    <div className="fixed inset-0 bg-[#D9D9D9]/75 flex items-center justify-center z-50">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log("enviando datos..");
          if (!initialData) {
            const categoriaCreada: ICategoria | undefined =
              await categoriaService.createCategoria(values);
            if (categoriaCreada) {
              createCategory(categoriaCreada);
            }
          } else {
            const nuevoTipo: ITipo = {
              id: 0,
              activo: false,
              nombre: values.nombreTipo,
            };
            const tipoCreado = await tipoService.createTipo(nuevoTipo);
            if (tipoCreado) {
              const categoriaActualizada: ICategoria = {
                ...initialData,
                ...values,
                tipo: tipoCreado,
              };
              if (categoriaActualizada) {
                updateCategory(categoriaActualizada);
              }
            }
          }
          onClose();
        }}
      >
        {({ values, handleChange, touched, errors }) => (
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
                <input
                  type="text"
                  name="nombreTipo"
                  value={values.nombreTipo}
                  onChange={handleChange}
                  placeholder="Tipo:"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
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
