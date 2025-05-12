import { useParams } from "react-router-dom";
import Header from "../../components/ui/Header/Header";
import Filter from "../../components/ui/Filter/Filter";
import Location from "../../components/ui/Location/Location";
import HeroHM from "../../components/ui/HeroHM/HeroHM";
import ProductsHM from "../../components/ui/ProductsHM/ProductsHM";
import AdvertisingHM from "../../components/ui/AdvertisingHM/AdvertisingHM";
import Footer from "../../components/ui/Footer/Footer";

const ViewHM = () => {
  const { gender } = useParams();
  return (
    <>
      <Header />
      <Filter />
      <Location />
      <HeroHM />
      <ProductsHM />
      <AdvertisingHM />
      <Footer />
    </>
  );
};

export default ViewHM;
