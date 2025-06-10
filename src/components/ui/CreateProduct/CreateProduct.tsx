import { Icon } from "@iconify/react";
import { IProduct } from "../../../types/IProduct";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { FC, useState } from "react";
import TallesModal from "../TallesModal/TallesModal";

interface CreateProductProps {
  initialData?: IProduct;
  onClose: VoidFunction;
}

const CreateProduct: FC<CreateProductProps> = ({ initialData, onClose }) => {
  const [showTalleModal, setShowTalleModal] = useState(false);

  const initialValues: IProduct = initialData ?? {
    id: 0,
    activo: false,
    nombre: "",
    precio: 0,
    categorias: {},
    descripcion: "",
    talles: [],
    stock: 0,
    imagen: null,
    color: "",
    marca: "",
    descuentos: [],
  };

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required("Ingrese un nombre")
      .min(2, "Debe tener al menos 2 caracteres"),

    precio: Yup.number()
      .required("Ingrese un precio")
      .min(1, "El precio debe ser mayor a 0"),

    categorias: Yup.array().min(1, "Debe seleccionar al menos una categoría"),

    descripcion: Yup.string()
      .required("Ingrese una descripción")
      .min(5, "Debe tener al menos 5 caracteres"),

    talles: Yup.array()
      .of(
        Yup.object({
          talle: Yup.string().required(),
          stock: Yup.number().required().min(0),
        })
      )
      .min(1, "Debe agregar al menos un talle"),

    stock: Yup.number()
      .required("Ingrese el stock")
      .min(0, "El stock no puede ser negativo"),

    color: Yup.string().required("Ingrese un color"),

    marca: Yup.string().required("Ingrese una marca"),

    descuentos: Yup.array().of(Yup.object()),
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
          <>
            <Form>
              <div className="flex flex-col min-h-screen items-center justify-center px-4 py-8">
                <div className="w-full max-w-md border border-black p-6 bg-white">
                  <div className="text-center text-1xl font-bold mb-4">
                    <h1>
                      {initialData ? "Editar Producto" : "Crear Producto"}
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

                  {/* Descripción */}
                  <textarea
                    name="descripcion"
                    value={values.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción:"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />

                  {/* Talles */}
                  <div className="flex flex-col sm:flex-row gap-2 mb-2">
                    <input
                      type="text"
                      readOnly
                      name="talles"
                      value={values.talles
                        .map((t) => `${t.talle}: ${t.stock}`)
                        .join(", ")}
                      placeholder="Talles:"
                      className="flex-grow p-2 border border-gray-300 rounded"
                    />
                    <button
                      type="button"
                      className="text-black border border-gray-300 rounded px-2 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => setShowTalleModal(true)}
                    >
                      Modificar
                    </button>
                  </div>

                  {/* Stock */}
                  <input
                    type="number"
                    name="stock"
                    value={values.stock}
                    onChange={handleChange}
                    placeholder="Stock:"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />

                  {/* Precio */}
                  <input
                    type="number"
                    name="precio"
                    value={values.precio}
                    onChange={handleChange}
                    placeholder="Precio:"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />

                  {/* Imagen */}
                  <div className="relative w-full mb-2">
                    <input
                      type="file"
                      id="imagenJPG"
                      name="imagenJPG"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.currentTarget.files?.[0] ?? null;
                        setFieldValue("imagenJPG", file);
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="imagenJPG"
                      className="flex items-center justify-between px-4 py-2 cursor-pointer border border-gray-300 rounded w-full bg-white hover:bg-gray-100"
                    >
                      {values.imagen?.name || "Seleccionar imagen JPG..."}
                      <Icon icon="formkit:folder" width="18" height="18" />
                    </label>
                  </div>

                  {/* Marca */}
                  <input
                    type="text"
                    name="marca"
                    value={values.marca}
                    onChange={handleChange}
                    placeholder="Marca:"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />

                  {/* Color */}
                  <input
                    type="text"
                    name="color"
                    value={values.color}
                    onChange={handleChange}
                    placeholder="Color:"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />

                  {/* Botones */}
                  <div className="flex flex-col sm:flex-row gap-22 justify-center">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-black buttons hover:cursor-pointertext-white py-2 px-6"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={onClose}
                      type="button"
                      className="w-full sm:w-auto bg-[#5A0000] buttons hover:cursor-pointer text-white py-2 px-6"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </Form>
            {showTalleModal && (
              <TallesModal
                isOpen={true}
                initialTalles={values.talles}
                onClose={() => setShowTalleModal(false)}
                onSave={(newTalles) => {
                  setFieldValue("talles", newTalles);
                  setShowTalleModal(false);
                }}
              />
            )}
          </>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;