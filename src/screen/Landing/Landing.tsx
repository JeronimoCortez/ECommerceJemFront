import Footer from "../../components/ui/Footer/Footer";
import PublicityBar from "../../components/ui/PublicityBar/PublicityBar";
import LoginBar from "../../components/ui/LoginBar/LoginBar";
import Header from "../../components/ui/Header/Header";
import Filter from "../../components/ui/Filter/Filter";
import Hero from "../../components/ui/Hero/Hero";
import Carousel from "../../components/ui/Carousel/Carousel";
import { userStore } from "../../store/userStore";
import AdminButton from "../../components/ui/AdminButton/AdminButton";

const Landing = () => {
  const { userActive } = userStore();

  return (
    <div>
      {userActive && userActive.rol === "ADMIN" && (
        <AdminButton view="Usuario" />
      )}
      {userActive?.rol !== "ADMIN" && <PublicityBar />}
      <LoginBar />
      <Header />
      <Filter />
      <Hero />
      <Carousel />
      <Footer />
    </div>
  );
};

export default Landing;
