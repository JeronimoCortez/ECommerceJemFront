import Footer from "../../components/ui/Footer/Footer";
import PublicityBar from "../../components/ui/PublicityBar/PublicityBar";
import LoginBar from "../../components/ui/LoginBar/LoginBar";
import Header from "../../components/ui/Header/Header";
import Filter from "../../components/ui/Filter/Filter";
import Hero from "../../components/ui/Hero/Hero";
import Carousel from "../../components/ui/Carousel/Carousel";

const Landing = () => {
  return (
    <div>
      <PublicityBar />
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
