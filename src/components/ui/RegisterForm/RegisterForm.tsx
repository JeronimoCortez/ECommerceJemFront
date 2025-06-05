import JEMBar from "../JEMBar/JEMBar"

const RegisterForm = () => {
  return (
    <div>
    <JEMBar />
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="bg-white shadow drop-shadow-lg p-6 rounded-md w-[620px]">
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Nombre*"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            placeholder="DNI(sin puntos ni espacios)*"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            placeholder="Apellido*"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            placeholder="Teléfono*"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            placeholder="Correo electrónico*"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            placeholder="Contraseña*"
            type="password"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            placeholder="Repetir Contraseña*"
            type="password"
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-black text-white py-1 w-48 mt-6 rounded-full">
            Registrarme
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default RegisterForm
