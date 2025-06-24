import { Icon } from "@iconify/react";
import { IProduct } from "../../../types/IProduct";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { FC, useEffect, useState } from "react";
import TallesModal from "../TallesModal/TallesModal";
import { ICreateProduct } from "../../../types/ICreateProduct";
import { Genero } from "../../../types/enums/Genero.enum";
import { categoriaStore } from "../../../store/categoriaStore";
import useCategoria from "../../../hook/useCategoria";
import { ImagenService } from "../../../services/imagenService";
import useProduct from "../../../hook/useProduct";
import { ProductService } from "../../../services/productService";
import Swal from "sweetalert2";

interface CreateProductProps {
  initialData?: IProduct;
  onClose: VoidFunction;
}

const CreateProduct: FC<CreateProductProps> = ({ initialData, onClose }) => {
  const [showTalleModal, setShowTalleModal] = useState(false);
  const { categorias } = categoriaStore();
  const { getCategories } = useCategoria();
  const imagenService = new ImagenService();
  const { createProduct, updateProduct, eliminarImagenHook } = useProduct();
  const productService = new ProductService();
  const [preview, setPreview] = useState<string | null>(
    initialData?.imagen && initialData.imagen.length > 0
      ? initialData.imagen
      : null
  );

  useEffect(() => {
    console.log("Value preview: ", preview);

    loadCategories();
  }, []);

  const loadCategories = async () => {
    await getCategories();
  };

  const initialValues: ICreateProduct | IProduct = {
    nombre: initialData?.nombre || "",
    precio: initialData?.precio || 0,
    idCategoria: initialData?.categoria?.id ?? 0,
    descripcion: initialData?.descripcion || "",
    talles: initialData?.talles || [],
    imagen: initialData?.imagen || null,
    color: initialData?.color || "",
    marca: initialData?.marca || "",
    genero: initialData?.genero || null,
  };

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required("Ingrese un nombre")
      .min(2, "Debe tener al menos 2 caracteres"),

    precio: Yup.number()
      .required("Ingrese un precio")
      .min(1, "El precio debe ser mayor a 0"),

    idCategoria: Yup.number()
      .required("Debe seleccionar una categoría")
      .moreThan(0, "Debe seleccionar una categoría válida"),

    descripcion: Yup.string()
      .required("Ingrese una descripción")
      .min(5, "Debe tener al menos 5 caracteres")
      .max(1000, "Maximo 1000 caracteres"),

    talles: Yup.array()
      .of(
        Yup.object({
          talle: Yup.string().required(),
          stock: Yup.number().required().min(0),
        })
      )
      .min(1, "Debe agregar al menos un talle"),

    color: Yup.string().required("Ingrese un color"),

    marca: Yup.string().required("Ingrese una marca"),
  });

  const handleRemoveImage = async () => {
    await eliminarImagenHook(initialData!.id);
  };

  return (
    <div className="fixed inset-0 bg-[#D9D9D9]/75 flex items-center justify-center z-50">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log("Enviando formulario...");

          if (!initialData) {
            let imagenUrl: string | null = null;

            if (values.imagen instanceof File) {
              imagenUrl = await imagenService.uploadImage(values.imagen);
            } else if (typeof values.imagen === "string") {
              imagenUrl = values.imagen;
            }

            const productData = {
              ...values,
              imagen: imagenUrl,
              talles: values.talles.map((t) => ({
                talle: t.talle,
                stock: t.stock,
              })),
            };
            const productoCreado: IProduct | undefined =
              await productService.createProduct(productData);
            if (productoCreado) {
              createProduct(productoCreado);
            }
          } else {
            let imagenUrl: string | null = null;

            if (initialData.imagen) {
              await imagenService.eliminarImagen(initialData.id);
            }

            if (values.imagen instanceof File) {
              imagenUrl = await imagenService.uploadImage(values.imagen);
            } else if (typeof values.imagen === "string") {
              imagenUrl = values.imagen;
            }

            const productoActualizado: IProduct = {
              ...initialData,
              ...values,
              imagen: imagenUrl ?? "",
              categoria: {
                ...initialData.categoria,
                id: values.idCategoria,
              },
              talles: values.talles.map((t) => ({
                id: t.id ?? 0,
                talle: t.talle,
                stock: t.stock,
                activo: t.activo ?? true,
              })),
              genero: values.genero as Genero,
            };

            if (productoActualizado) {
              updateProduct(productoActualizado);
            }
          }

          onClose();
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
                  <div>
                    <textarea
                      name="descripcion"
                      value={values.descripcion}
                      onChange={handleChange}
                      placeholder="Descripción:"
                      className={`w-full p-2 border rounded  ${
                        touched.descripcion && errors.descripcion
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {touched.descripcion && errors.descripcion && (
                      <p className="text-red-500 text-xs">
                        *{errors.descripcion}
                      </p>
                    )}
                  </div>

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

                  {/* Precio */}
                  <input
                    type="number"
                    name="precio"
                    value={values.precio}
                    onChange={handleChange}
                    placeholder="Precio:"
                    className={`w-full p-2 border rounded mb-2 ${
                      touched.nombre && errors.nombre
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {/* Marca */}
                  <input
                    type="text"
                    name="marca"
                    value={values.marca}
                    onChange={handleChange}
                    placeholder="Marca:"
                    className={`w-full p-2 border rounded mb-2 ${
                      touched.nombre && errors.nombre
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {/* Color */}
                  <input
                    type="text"
                    name="color"
                    value={values.color}
                    onChange={handleChange}
                    placeholder="Color:"
                    className={`w-full p-2 border rounded mb-2 ${
                      touched.nombre && errors.nombre
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {/* Género */}
                  <select
                    id="genero"
                    name="genero"
                    value={values.genero?.toString()}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded mb-2 ${
                      touched.nombre && errors.nombre
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
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

                  {/* /* Categoria */}
                  <select
                    name="idCategoria"
                    id="idCategoria"
                    value={values.idCategoria}
                    onChange={(e) =>
                      setFieldValue("idCategoria", Number(e.target.value))
                    }
                    className={`w-full p-2 border rounded mb-2 ${
                      touched.nombre && errors.nombre
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value={0}>Seleccione una categoria</option>
                    {categorias.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre} {c.tipo.nombre}
                      </option>
                    ))}
                  </select>

                  {/* IMAGEN */}
                  <input
                    type="file"
                    id="imagenJPG"
                    name="imagen"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0] ?? null;
                      console.log("Seleccionado:", file);
                      if (file) {
                        const urlPreview = URL.createObjectURL(file);
                        console.log("Preview generado:", urlPreview);
                        setPreview(urlPreview);
                        setFieldValue("imagen", file);
                      } else {
                        setFieldValue("imagen", null);
                        setPreview(null);
                      }
                    }}
                    onClick={(e) => {
                      e.currentTarget.value = "";
                    }}
                  />

                  <label
                    htmlFor="imagenJPG"
                    className="flex items-center gap-3 border border-gray-300 rounded p-2 cursor-pointer hover:bg-gray-100 my-2"
                  >
                    {values.imagen ? (
                      <img
                        src={
                          preview ||
                          (typeof values.imagen === "string"
                            ? values.imagen
                            : "../NoImage.jpg")
                        }
                        alt="Imagen seleccionada"
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <Icon icon="mdi:folder" width={24} height={24} />
                    )}
                    <span className="text-gray-700">
                      {values.imagen ? "Cambiar imagen" : "Seleccionar imagen"}
                    </span>
                  </label>

                  {values.imagen && (
                    <div
                      className="my-1 text-center text-red-500 font-bold cursor-pointer border border-red-500"
                      onClick={async () => {
                        const confirm = await Swal.fire({
                          title: "¿Estás seguro que deseas eliminar la imagen?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Sí, eliminar",
                          cancelButtonText: "Cancelar",
                        });
                        if (!confirm.isConfirmed) return;

                        if (initialData) {
                          await handleRemoveImage();
                        }
                        setFieldValue("imagen", null);
                        setPreview(null);
                      }}
                    >
                      <p>Eliminar imagen</p>
                    </div>
                  )}

                  {/* Botones */}
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-black buttons hover:cursor-pointer text-white py-2 px-6"
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
