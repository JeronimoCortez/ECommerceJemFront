import { Route, Routes } from "react-router-dom";
import Landing from "../screen/Landing/Landing";
import ViewHM from "../screen/ViewHM/ViewHM";
import Login from "../screen/Login/Login";
import Register from "../screen/Register/Register";
import ProductDetails from "../screen/ProductDetails/ProductDetails";
import Accessories from "../screen/Accesories/Accesories";
import PaymentSuccess from "../screen/PaymentSucces/PaymentSuccess";
import PaymentFailure from "../screen/PaymentFailure/PaymentFailure";
import OrdersUser from "../screen/OrdersUser/OrdersUser";
import Profile from "../screen/Profile/Profile";
import Admin from "../screen/Admin/Admin";
import Catalogue from "../screen/Catalogue/Catalogue";
import Order from "../components/ui/Order/Order";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/view/:gender" element={<ViewHM />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/accesories" element={<Accessories />} />
      <Route path="/catalogue/:gender?/:category?" element={<Catalogue />} />
      <Route path="/pagoExitoso" element={<PaymentSuccess />} />
      <Route path="/pagoRechazado" element={<PaymentFailure />} />
      <Route path="/ordersUser/:id" element={<OrdersUser />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/order" element={<Order />} />
    </Routes>
  );
};

export default AppRouter;
