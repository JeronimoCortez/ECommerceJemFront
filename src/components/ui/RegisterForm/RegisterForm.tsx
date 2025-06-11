import { Form, Formik } from "formik";
import JEMBar from "../JEMBar/JEMBar";
import { IRegister } from "../../../types/IRegister";
import * as Yup from "yup";
import { register } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../../store/userStore";
import { IAuthResponse } from "../../../types/IAuthResponse";
import { UserService } from "../../../services/userService";

const validationSchema = Yup.object({
  name: Yup.string().required(),
  lastname: Yup.string().required(),
  password: Yup.string().required(),
  passwordRepeat: Yup.string().oneOf(
    [Yup.ref("password")],
    "Las contraseñas no coinciden"
  ),
  email: Yup.string().required(),
  dni: Yup.string().required(),
  phone: Yup.string().required(),
});

const RegisterForm = () => {
  const { setUserActive } = userStore();
  const navigate = useNavigate();
  const userService = new UserService();

  const initialValues: IRegister & { passwordRepeat: string } = {
    name: "",
    lastname: "",
    password: "",
    passwordRepeat: "",
    email: "",
    dni: "",
    phone: "",
  };
  return (
    <div>
      <JEMBar />
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const { passwordRepeat, ...registerData } = values;
          console.log(registerData);
          const data: IAuthResponse | null | undefined = await register(
            registerData
          );
          if (data) {
            const user = await userService.getById(data?.userId);
            if (user) {
              setUserActive(user);
              navigate("/");
            }
          }
        }}
      >
        {({ values, handleChange, errors, touched, handleBlur }) => (
          <Form>
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
              <div className="bg-white shadow drop-shadow-lg p-6 rounded-md md:w-[620px]">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nombre*"
                    className={`border border-gray-300 p-2 rounded ${
                      errors.name && touched.name && "border-red-500"
                    }`}
                  />
                  <input
                    type="text"
                    name="dni"
                    value={values.dni}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="DNI (sin puntos ni espacios)*"
                    className={`border border-gray-300 p-2 rounded ${
                      errors.name && touched.name && "border-red-500"
                    }`}
                  />
                  <input
                    type="text"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Apellido*"
                    className={`border border-gray-300 p-2 rounded ${
                      errors.name && touched.name && "border-red-500"
                    }`}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Teléfono*"
                    className={`border border-gray-300 p-2 rounded ${
                      errors.name && touched.name && "border-red-500"
                    }`}
                  />
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Correo electrónico*"
                    className={`border border-gray-300 p-2 rounded ${
                      errors.name && touched.name && "border-red-500"
                    }`}
                  />
                  <input
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Contraseña*"
                    type="password"
                    className={`border border-gray-300 p-2 rounded ${
                      errors.name && touched.name && "border-red-500"
                    }`}
                  />
                  <input
                    name="passwordRepeat"
                    value={values.passwordRepeat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Repetir Contraseña*"
                    type="password"
                    className={`border border-gray-300 p-2 rounded ${
                      errors.name && touched.name && "border-red-500"
                    }`}
                  />
                  {errors.passwordRepeat && touched.passwordRepeat && (
                    <p className="text-red-500 text-sm my-auto">
                      {errors.passwordRepeat}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="cursor-pointer bg-black text-white py-1 w-48 mt-6 rounded-full"
                  >
                    Registrarme
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

export default RegisterForm;
