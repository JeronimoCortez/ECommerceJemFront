import AdvertisingHM from "../components/ui/AdvertisingHM/AdvertisingHM";
import Filter from "../components/ui/Filter/Filter";
import Header from "../components/ui/Header/Header";
import HeroHM from "../components/ui/HeroHombre/HeroHM";
import Location from "../components/ui/Location/Location";
import ProductsHM from "../components/ui/ProductsHM/ProductsHM";

const ViewHM = () => {
  return (
    <div>
      <Header />
      <Filter />
      <Location />
      <HeroHM />
      <ProductsHM />
      <AdvertisingHM />
    </div>
  );
};

export default ViewHM;
