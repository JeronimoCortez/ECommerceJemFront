import { Route, Routes } from "react-router-dom";
import Landing from "../screen/Landing/Landing";
// import ViewHM from "../screen/ViewHM/ViewHM";
import Login from "../screen/Login/Login";
import Register from "../screen/Register/Register";
// import ProductDetails from "../screen/ProductDetails/ProductDetails";
import Accessories from "../screen/Accesories/Accesories";
import Profile from "../screen/Profile/Profile";
import Admin from "../screen/Admin/Admin";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* <Route path="/view/:gender" element={<ViewHM />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
      <Route path="/catalogue" element={<Accessories />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default AppRouter;
