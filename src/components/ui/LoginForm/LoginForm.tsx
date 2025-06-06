import { ILogin } from "../../../types/ILogin";
import { Form, Formik } from "formik";
import JEMBar from "../JEMBar/JEMBar";
import * as Yup from "yup";
import { login } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userStore } from "../../../store/userStore";
import { IAuthResponse } from "../../../types/IAuthResponse";
import { getUser } from "../../../services/userService";
import { IUsuario } from "../../../types/IUsuario";

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const LoginForm = () => {
  const { setUserActive } = userStore();
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState(false);

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
        onSubmit={async (values) => {
          const data: IAuthResponse | null | undefined = await login(values);
          if (data) {
            const user: IUsuario | undefined = await getUser(data.userId);
            if (user && user.activo) {
              setUserActive(user);
              navigate("/");
            }
          } else {
            setErrorLogin(true);
          }
        }}
      >
        {({ values, handleChange, errors, touched, handleBlur }) => (
          <Form>
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
              <div className="bg-white shadow drop-shadow-lg p-6 rounded-md w-70 h-64 flex flex-col justify-center">
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Ingrese Email"
                  onBlur={handleBlur}
                  className={`w-full p-2 mb-4 border border-gray-300 rounded ${
                    touched.email && errors.email && "border-red-500"
                  } `}
                />
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  className={`w-full p-2 mb-2 border border-gray-300 rounded ${
                    touched.email && errors.email && "border-red-500"
                  } `}
                />
                {errorLogin && (
                  <p className="text-red-500 font-bold text-[12px] mb-2">
                    Usuario o contraseña incorrectos
                  </p>
                )}
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
