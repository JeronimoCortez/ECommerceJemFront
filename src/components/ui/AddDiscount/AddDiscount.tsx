import { Formik, Form } from "formik";
import * as Yup from "yup";
import { IDescuento } from "../../../types/IDescuento";
import useDescuento from "../../../hook/useDescuento";
import { DescuentoService } from "../../../services/descuentoService";
import useProduct from "../../../hook/useProduct";

interface AddDiscountProps {
  onClose: () => void;
  initialValues?: IDescuento;
  idProduct: number;
}

const defaultValues: IDescuento = {
  id: 0,
  activo: false,
  descuento: 0,
  fechaInicio: new Date().toISOString().split("T")[0],
  fechaLimite: new Date().toISOString().split("T")[0],
};

const validationSchema = Yup.object({
  descuento: Yup.number()
    .required("Ingrese un porcentaje de descuento")
    .min(0, "Debe ser al menos 0%"),
  fechaInicio: Yup.string().required("Ingrese la fecha de inicio"),
  fechaLimite: Yup.string()
    .required("Ingrese una fecha límite")
    .test(
      "is-after-or-equal",
      "La fecha límite debe ser posterior a la de inicio",
      function (value) {
        const { fechaInicio } = this.parent;
        return new Date(value) >= new Date(fechaInicio);
      }
    ),
});

const AddDiscount = ({
  onClose,
  initialValues = defaultValues,
  idProduct,
}: AddDiscountProps) => {
  const { addDescuento } = useDescuento();
  const { asignarDescuentoHook } = useProduct();
  const descuentoService = new DescuentoService();

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (initialValues) {
          const descuento: IDescuento | undefined =
            await descuentoService.createDescuento(values);
          if (descuento) {
            await addDescuento(values);
            await asignarDescuentoHook(idProduct, descuento);
          }
        }
        onClose();
      }}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form>
          <div className="w-full max-w-md border border-black p-6 bg-white">
            <div className="text-center text-2xl font-bold mb-6">
              <h1>
                {initialValues.id ? "Editar descuento" : "Agregar descuento"}
              </h1>
            </div>

            <div className="flex flex-col gap-4">
              {/* DESCUENTO */}
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  name="descuento"
                  placeholder="Porcentaje de descuento:"
                  onChange={handleChange}
                  value={values.descuento}
                  className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded"
                />
                {touched.descuento && errors.descuento && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.descuento}
                  </p>
                )}
              </div>

              {/* FECHA INICIO */}
              <div className="flex flex-col items-center">
                <input
                  type="date"
                  name="fechaInicio"
                  onChange={handleChange}
                  value={
                    values.fechaInicio
                      ? new Date(values.fechaInicio).toISOString().split("T")[0]
                      : ""
                  }
                  className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded"
                />
                {touched.fechaInicio && errors.fechaInicio && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fechaInicio}
                  </p>
                )}
              </div>

              {/* FECHA LÍMITE */}
              <div className="flex flex-col items-center">
                <input
                  type="date"
                  name="fechaLimite"
                  onChange={handleChange}
                  value={
                    values.fechaLimite
                      ? new Date(values.fechaLimite).toISOString().split("T")[0]
                      : ""
                  }
                  className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded"
                />
                {touched.fechaLimite && errors.fechaLimite && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fechaLimite}
                  </p>
                )}
              </div>

              {/* BOTONES */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-black py-2 px-6 buttons text-white"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto bg-[#5A0000] py-2 px-6 buttons text-white"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddDiscount;
