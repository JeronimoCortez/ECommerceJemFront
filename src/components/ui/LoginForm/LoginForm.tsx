import JEMBar from "../JEMBar/JEMBar";

const LoginForm = () => {
  return (
    <div>
      <JEMBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="bg-white shadow drop-shadow-lg p-6 rounded-md w-70 h-64 flex flex-col justify-center">
          <input
            type="email"
            placeholder="Ingrese Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 mb-6 border border-gray-300 rounded"
          />
          <div className="flex items-center justify-center">
            <button className="bg-black text-white py-1 w-48 rounded-full">
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
    </div>
  );
};

export default LoginForm;
