import { Icon } from "@iconify/react";
import { IProduct } from "../../../types/IProduct";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useState } from "react";
import TallesModal from "../TallesModal/TallesModal";
import { Genero } from "../../../types/enums/Genero.enum"

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
    descuentos: [],
    genero: Genero.HOMBRE
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

    descuentos: Yup.array().of(Yup.object()),

    genero: Yup.mixed<Genero>()
    .oneOf(Object.values(Genero).filter((v): v is Genero => typeof v === "string"), "Seleccione un género válido")
    .required("El género es obligatorio"),
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
            <div className="flex flex-col min-h-screen items-center justify-center px-4 py-8">
              <div className="w-full max-w-4xl border border-black p-6 bg-white">
                <div className="text-center text-2xl font-bold mb-6">
                  <h1>{initialData ? "Editar Producto" : "Nuevo Producto"}</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Columna Izquierda */}
                  <div className="flex flex-col gap-4">
                    {/* Nombre */}
                    <input
                      type="text"
                      name="nombre"
                      value={values.nombre}
                      placeholder="Nombre:"
                      onChange={handleChange}
                      className={`w-full p-2 border rounded ${
                        touched.nombre && errors.nombre ? "border-red-500" : "border-gray-300"
                      }`}
                    />

                    {/* Descripción */}
                    <textarea
                      name="descripcion"
                      value={values.descripcion}
                      onChange={handleChange}
                      placeholder="Descripción:"
                      className="w-full p-2 border border-gray-300 rounded"
                    />

                    {/* Talles */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        name="talles"
                        value={values.talles.map((t) => `${t.talle}: ${t.stock}`).join(", ")}
                        placeholder="Talles:"
                        className="flex-grow p-2 border border-gray-300 rounded"
                      />
                      <button
                        type="button"
                        className="text-black cursor-pointer border border-gray-300 rounded px-3 py-2 hover:bg-gray-200"
                        onClick={() => setShowTalleModal(true)}
                      >
                        Modificar talles
                      </button>
                    </div>

                    {/* Stock */}
                    <input
                      type="number"
                      name="stock"
                      value={values.stock}
                      onChange={handleChange}
                      placeholder="Stock:"
                      className="w-full p-2 border border-gray-300 rounded"
                    />

                    {/* Precio */}
                    <input
                      type="number"
                      name="precio"
                      value={values.precio}
                      onChange={handleChange}
                      placeholder="Precio:"
                      className="w-full p-2 border border-gray-300 rounded"
                    />

                    {/* Imagen JPG */}
                    <div className="relative w-full">
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
                        {values.imagenJPG?.name || "Seleccionar imagen JPG..."}
                        <Icon icon="formkit:folder" width="18" height="18" />
                      </label>
                    </div>
                  </div>

                  {/* Columna Derecha */}
                  <div className="flex flex-col gap-4">
                    {/* Marca */}
                    <input
                      type="text"
                      name="marca"
                      value={values.marca}
                      onChange={handleChange}
                      placeholder="Marca:"
                      className="w-full p-2 border border-gray-300 rounded"
                    />

                    {/* Color */}
                    <input
                      type="text"
                      name="color"
                      value={values.color}
                      onChange={handleChange}
                      placeholder="Color:"
                      className="w-full p-2 border border-gray-300 rounded"
                    />

                    {/* Género */}
                    <select
                      id="genero"
                      name="genero"
                      value={values.genero}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded"
                    >
                      <option value="">Seleccione un género</option>
                      <option value={Genero.HOMBRE}>Hombre</option>
                      <option value={Genero.MUJER}>Mujer</option>
                      <option value={Genero.NINO}>Niño</option>
                      <option value={Genero.NINA}>Niña</option>
                    </select>
                    {touched.genero && errors.genero && (
                      <p className="text-red-500">{errors.genero}</p>
                    )}

                    {/* Categoria */}
                    <select name="categorias" id="categorias" value={values.categorias.map(c => c.id.toString())} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded">
                      <option value="">Seleccione una categoria</option>
                      <option value="calzado">Calzado</option>
                      <option value="remera">Remera</option>
                      <option value="pantalon">Pantalon</option>
                    </select>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <button type="submit" className="w-full sm:w-auto bg-black buttons text-white">
                    Guardar
                  </button>
                  <button type="button" className="w-full sm:w-auto bg-[#5A0000] buttons text-white">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>

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
