import { useNavigate } from "react-router-dom";
import { userStore } from "../../../store/userStore";

const LoginBar = () => {
  const { userActive, setUserActive } = userStore();
  const navigate = useNavigate();

  const handleCloseSession = () => {
    localStorage.removeItem("token");
    setUserActive(null);
    navigate("/");
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  const handleNavigateToOrders = () => {
    navigate(`/ordersUser/${userActive?.id}`);
  };
  return (
    <div className="bg-gray-300 text-black text-right py-1 text-sm ">
      <div>
        {userActive ? (
          userActive.rol === "USER" ? (
            <div>
              <button
                className="cursor-pointer"
                onClick={handleNavigateToProfile}
              >
                Mi perfil /
              </button>
              <button
                className="cursor-pointer"
                onClick={handleNavigateToOrders}
              >
                Mis ordenes /
              </button>
              <button className="cursor-pointer" onClick={handleCloseSession}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <>
              <button className="cursor-pointer" onClick={handleCloseSession}>
                Cerrar Sesión
              </button>
            </>
          )
        ) : (
          <>
            <a href="/login">Iniciar Sesión</a> /{" "}
            <a href="/register">Registrarse</a>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginBar;
