import { useParams } from "react-router-dom";
import Location from "../../components/ui/Location/Location";
import HeroHM from "../../components/ui/HeroHM/HeroHM";
import AdvertisingHM from "../../components/ui/AdvertisingHM/AdvertisingHM";
import Footer from "../../components/ui/Footer/Footer";
import PublicityBar from "../../components/ui/PublicityBar/PublicityBar";
import FilterHM from "../../components/ui/FilterHM/FilterHM";

const ViewHM = () => {
  const { gender } = useParams();
  return (
    <>
      <PublicityBar />
      <FilterHM />
      <Location location={String(gender)} subLocation={"Home"} />
      <HeroHM />
      <AdvertisingHM />
      <Footer />
    </>
  );
};

export default ViewHM;
