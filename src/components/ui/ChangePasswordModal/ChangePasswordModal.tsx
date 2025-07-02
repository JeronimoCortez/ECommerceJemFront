import { Form, Formik } from "formik";
import * as Yup from "yup";
import { UserService } from "../../../services/userService";
import { userStore } from "../../../store/userStore";
import Swal from "sweetalert2";

const validationSchema = Yup.object({
  contrasenia: Yup.string().required(),
  nuevaContrasenia: Yup.string().required(),
  repetirContrasenia: Yup.string()
    .oneOf([Yup.ref("nuevaContrasenia")], "Las contraseñas no coinciden")
    .required(),
});

const ChangePasswordModal = () => {
  const { userActive } = userStore();
  const initialValues = {
    contrasenia: "",
    nuevaContrasenia: "",
    repetirContrasenia: "",
  };
  const userService = new UserService();
  return (
    <div>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await userService.changePassword(
              userActive!.id,
              values.contrasenia,
              values.nuevaContrasenia
            );
            Swal.fire("Exito", "Contraseña cambiada con éxito", "success");
            resetForm();
          } catch (error) {
            Swal.fire("Error", "Error al cambiar contraseña", "error");
          }
        }}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form className="flex flex-col justify-center mx-auto mt-2 w-[70vw] gap-1">
            <label htmlFor="contrasenia">Contraseña</label>
            <input
              id="contrasenia"
              type="password"
              value={values.contrasenia}
              onChange={handleChange}
              className={`${
                touched.contrasenia && errors.contrasenia
                  ? "border border-red-500 rounded p-1"
                  : "border border-[#D9D9D9]/75 rounded p-1"
              }`}
            />
            <label htmlFor="nuevaContrasenia">Nueva contraseña</label>
            <input
              id="nuevaContrasenia"
              type="password"
              value={values.nuevaContrasenia}
              onChange={handleChange}
              className={`${
                touched.nuevaContrasenia && errors.nuevaContrasenia
                  ? "border border-red-500 rounded p-1"
                  : "border border-[#D9D9D9]/75 rounded p-1"
              }`}
            />
            <label htmlFor="repetirContrasenia">Repetir nueva contraseña</label>
            <input
              id="repetirContrasenia"
              type="password"
              value={values.repetirContrasenia}
              onChange={handleChange}
              className={`${
                touched.repetirContrasenia && errors.repetirContrasenia
                  ? "border border-red-500 rounded p-1"
                  : "border border-[#D9D9D9]/75 rounded p-1"
              }`}
            />
            <button
              type="submit"
              className="bg-[#000] mx-auto cursor-pointer mt-2 w-[200px] p-2 text-white"
            >
              Enviar cambios
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordModal;
