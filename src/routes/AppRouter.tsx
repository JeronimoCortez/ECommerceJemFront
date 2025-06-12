import { Route, Routes } from "react-router-dom";
import Landing from "../screen/Landing/Landing";
import ViewHM from "../screen/ViewHM/ViewHM";
import Login from "../screen/Login/Login";
import Register from "../screen/Register/Register";
import ProductDetails from "../screen/ProductDetails/ProductDetails";
import Accessories from "../screen/Accesories/Accesories";
import CreateProduct from "../components/ui/CreateProduct/CreateProduct";
import AddDiscount from "../components/ui/AddDiscount/AddDiscount";
import EditProfileUser from "../components/ui/EditProfileUser/EditProfileUser";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/view/:gender" element={<ViewHM />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/catalogue" element={<Accessories />} />
      <Route path="/createProduct" element={<CreateProduct />} /> /* nuevo elemento */
      <Route path="/addDiscount" element={<AddDiscount />} /> /* nuevo elemento */
      <Route path="/editProfileUser" element={<EditProfileUser />} />
    </Routes>
  );
};

export default AppRouter;
