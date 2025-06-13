import { FC } from "react";
import { IProduct } from "../../../types/IProduct";
import SeeMoreButton from "../SeeMoreButton/SeeMoreButton";

interface HeroProps {
  product: IProduct;
}

const Hero: FC<HeroProps> = ({product}) => {
  return (
    <div>
      <div className="w-full mt-6">
        <img
          src="/ac7139ea-c00a-402f-a93c-47cb3b20315f___c4541474895a077b3a718ac472773a3f.webp"
          alt="Banner principal"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="text-center px-4 mb-10 mt-4">
        <p className="font-bold">Las botas con más estilo de Nike</p>
        <h2 className="text-2xl font-bold">NIKE DUNK LOW RETRO</h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-700">
        Siempre puedes contar con un clásico. Los icónicos colores contrastantes se combinan con materiales premium y un acolchado suave para ofrecer una comodidad duradera que cambia las reglas del partido. Las posibilidades son infinitas. ¿Cómo vas a llevar tus Dunk?
        </p>
        <SeeMoreButton productId={product.id}/>
      </div>
    </div>
  );
};

export default Hero;
