import { useState, useRef, useEffect } from "react";
import JEMBar from "../JEMBar/JEMBar";
import LoginBar from "../LoginBar/LoginBar";
import UpArrow from "../UpArrow/UpArrow";

const ProfileForm = () => {
  const [addressOpen, setAddressOpen] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);
  const addressRef = useRef<HTMLDivElement>(null);
  const pwdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        addressOpen &&
        addressRef.current &&
        !addressRef.current.contains(e.target as Node)
      ) {
        setAddressOpen(false);
      }
      if (
        pwdOpen &&
        pwdRef.current &&
        !pwdRef.current.contains(e.target as Node)
      ) {
        setPwdOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [addressOpen, pwdOpen]);

  return (
    <div>
      <JEMBar />
      <LoginBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white mt-20 mb-20">
        <div className="bg-white shadow drop-shadow-lg p-6 rounded-md w-[620px] relative">
          <div className="flex items-center justify-center mb-6">
            <div className="text-black">Editar Datos Personales</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Nombre*"
              className="border border-gray-300 p-2 rounded placeholder-black"
            />
            <input
              placeholder="DNI(sin puntos ni espacios)*"
              className="border border-gray-300 p-2 rounded placeholder-black"
            />
            <input
              placeholder="Apellido*"
              className="border border-gray-300 p-2 rounded placeholder-black"
            />
            <input
              placeholder="Teléfono*"
              className="border border-gray-300 p-2 rounded placeholder-black"
            />
            <input
              placeholder="Correo electrónico*"
              className="border border-gray-300 p-2 rounded placeholder-black"
            />
            <div className="relative" ref={addressRef}>
              <button
                onClick={() => setAddressOpen((o) => !o)}
                className="w-full flex items-center justify-between border border-gray-300 p-2 rounded bg-white"
              >
                Dirección*
                <div
                  className={`transform transition-transform duration-300 ${
                    addressOpen ? "rotate-180" : ""
                  }`}
                >
                  <UpArrow />
                </div>
              </button>
              {addressOpen && (
                <div className="absolute top-full left-0 bg-white p-4 border border-gray-300 rounded-md shadow-md w-full z-10">
                  <input
                    placeholder="Localidad*"
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    placeholder="Calle*"
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    placeholder="Código Postal*"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <button
              onClick={() => setPwdOpen(true)}
              className="text-black py-1 hover:underline"
            >
              Cambiar Contraseña
            </button>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button className="bg-black text-white py-1 w-48 rounded-full">
              Continuar
            </button>
          </div>
        </div>
      </div>
      {pwdOpen && (
        <div className="fixed inset-0 bg-[#D9D9D9]/75 flex items-center justify-center">
          <div
            ref={pwdRef}
            className="bg-white rounded-md shadow-lg p-6 w-60 space-y-4"
          >
            <div className="text-center ">Cambiar Contraseña</div>
            <input
              type="password"
              placeholder="Contraseña Actual*"
              className="w-full p-1 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Nueva Contraseña*"
              className="w-full p-1 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Repetir Contraseña*"
              className="w-full p-1 border border-gray-300 rounded"
            />
            <button
              onClick={() => setPwdOpen(false)}
              className="w-full bg-black text-white rounded-full"
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
