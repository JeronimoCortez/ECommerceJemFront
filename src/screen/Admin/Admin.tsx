import { useNavigate } from "react-router-dom";
import AdminButton from "../../components/ui/AdminButton/AdminButton";
import AdminPanel from "../../components/ui/AdminPanel/AdminPanel";
import { userStore } from "../../store/userStore";
import { useEffect } from "react";
const Admin = () => {
  const navigate = useNavigate();
  const { userActive } = userStore();

  useEffect(() => {
    if (!userActive || userActive.rol !== "ADMIN") {
      navigate("/");
    }
  }, [userActive, navigate]);
  if (!userActive || userActive.rol !== "ADMIN") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  } else {
    return (
      <div>
        {userActive && userActive?.rol === "ADMIN" && (
          <AdminButton view="admin" />
        )}
        <AdminPanel />
      </div>
    );
  }
};

export default Admin;
