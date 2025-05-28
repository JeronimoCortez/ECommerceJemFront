import { ILogin } from "../../../types/ILogin";
import { Form, Formik } from "formik";
import JEMBar from "../JEMBar/JEMBar";
import * as Yup from "yup";
import { login } from "../../../services/authService";

const validationSchema = Yup.object({
  email: Yup.string().email().required("Ingrese un mail valido"),
  password: Yup.string().required("Ingrese contraseña"),
});

const LoginForm = () => {
  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  return (
    <div>
      <JEMBar />
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          login(values);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
              <div className="bg-white shadow drop-shadow-lg p-6 rounded-md w-70 h-64 flex flex-col justify-center">
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Ingrese Email"
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  className="w-full p-2 mb-6 border border-gray-300 rounded"
                />
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-black text-white py-1 w-48 rounded-full hover:cursor-pointer"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </div>
              <p className="text-center text-md mt-4">
                ¡No tengo usuario{" "}
                <a href="/register" className="underline cursor-pointer">
                  quiero registrarme
                </a>
                !
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
