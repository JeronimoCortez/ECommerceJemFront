import { Route, Routes } from "react-router-dom";
import Landing from "../screen/Landing/Landing";
import ViewHM from "../screen/ViewHM/ViewHM";
import Login from "../screen/Login/Login";
import Register from "../screen/Register/Register";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/view/:gender" element={<ViewHM />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRouter;
