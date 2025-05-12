import SeeMoreButton from "../SeeMoreButton/SeeMoreButton";

const Hero = () => {
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
        <p className="font-bold">Las botas más ágiles de Nike</p>
        <h2 className="text-2xl font-bold">NIKE HYPERVENOM</h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-700">
          Pasados dos años ya de la primera versión, sigue evolucionando el
          concepto de Hypervenom, e introduce diversos cambios en las nuevas
          Phantom. Se introducen cambios en el Nikeskin haciéndolo más grueso,
          así como el “collar” de Nike y los briocables, buscando una bota más
          estable y con un golpeo más fuerte.
        </p>
        <SeeMoreButton />
      </div>
    </div>
  );
};

export default Hero;
