import { Icon } from "@iconify/react";
import { IProduct } from "../../../types/IProduct";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useState } from "react";
import TallesModal from "../TallesModal/TallesModal";

interface CreateProductProps {
  initialData?: IProduct;
}

const CreateProduct = ({ initialData }: CreateProductProps) => {
  const [showTalleModal, setShowTalleModal] = useState(false);

  const initialValues: IProduct = initialData ?? {
    id: 0,
    activo: false,
    nombre: "",
    precio: 0,
    categorias: [],
    descripcion: "",
    talles: [],
    stock: 0,
    imagenJPG: null,
    color: "",
    marca: "",
    descuentos: []
  };

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required("Ingrese un nombre")
      .min(2, "Debe tener al menos 2 caracteres"),

    precio: Yup.number()
      .required("Ingrese un precio")
      .min(1, "El precio debe ser mayor a 0"),

    categorias: Yup.array()
      .min(1, "Debe seleccionar al menos una categoría"),

    descripcion: Yup.string()
      .required("Ingrese una descripción")
      .min(5, "Debe tener al menos 5 caracteres"),

    talles: Yup.array().of(
      Yup.object({
        talle: Yup.string().required(),
        stock: Yup.number().required().min(0)
      })
    ).min(1, "Debe agregar al menos un talle"),

    stock: Yup.number()
      .required("Ingrese el stock")
      .min(0, "El stock no puede ser negativo"),

    color: Yup.string().required("Ingrese un color"),

    marca: Yup.string().required("Ingrese una marca"),

    descuentos: Yup.array().of(Yup.object())
  });

  return (
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
            <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center">
              <div className="flex flex-col gap-2 p-4 m-4 border border-black mx-auto">
                <div className="text-center text-2xl font-bold p-6">
                  <h1>{initialData ? "Editar Producto" : "Crear Producto"}</h1>
                </div>

                <input
                  type="text"
                  name="nombre"
                  value={values.nombre}
                  placeholder="Nombre:"
                  onChange={handleChange}
                  className={`inputsProduct w-full p-2 border rounded ${
                    touched.nombre && errors.nombre ? "border-red-500" : "border-gray-300"
                  }`}
                />

                <textarea
                  name="descripcion"
                  value={values.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción:"
                  className="inputsProduct w-full p-2"
                />

                <div className="inputsProduct">
                  <input
                    type="text"
                    readOnly
                    name="talles"
                    value={values.talles.map(t => `${t.talle}: ${t.stock}`).join(", ")}
                    onChange={handleChange}
                    placeholder="Talles:"
                    className="flex-grow outline-none"
                  />
                  <button type="button" className="text-black selector px-2" onClick={() => setShowTalleModal(true)}>
                    Modificar Talles
                  </button>
                </div>

                <input
                  type="text"
                  name="stock"
                  value={values.stock}
                  onChange={handleChange}
                  placeholder="Stock:"
                  className="inputsProduct flex-grow outline-none"
                />

                <input
                  type="text"
                  name="precio"
                  value={values.precio}
                  onChange={handleChange}
                  placeholder="Precio:"
                  className="inputsProduct flex-grow outline-none"
                />

                <div className="relative inputsProduct">
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
                    className="flex items-center justify-between px-4 py-2 cursor-pointer w-full bg-white text-gray-500 hover:bg-gray-100"
                  >
                    {values.imagenJPG?.name || "Seleccionar imagen JPG..."}
                    <Icon icon="formkit:folder" width="18" height="18" />
                  </label>
                </div>

                <input
                  type="text"
                  name="marca"
                  value={values.marca}
                  onChange={handleChange}
                  placeholder="Marca:"
                  className="inputsProduct flex-grow outline-none"
                />

                <input
                  type="text"
                  name="color"
                  value={values.color}
                  onChange={handleChange}
                  placeholder="Color:"
                  className="inputsProduct flex-grow outline-none"
                />

                <div className="flex gap-16 justify-center">
                  <button type="submit" className="buttons bg-black">Guardar</button>
                  <button type="button" className="buttons bg-[#5A0000]">Cancelar</button>
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
  );
};

export default CreateProduct;
