import AdminButton from "../../components/ui/AdminButton/AdminButton";
import AdminPanel from "../../components/ui/AdminPanel/AdminPanel";
import { userStore } from "../../store/userStore";

const Admin = () => {
  const { userActive } = userStore();
  return (
    <div>
      {userActive && <AdminButton view="admin" />}
      <AdminPanel />
    </div>
  );
};

export default Admin;
