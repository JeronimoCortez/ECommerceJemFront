const HeroHM = () => {
  return (
    <div>
      <div className="flex max-w-full">
        <img
          className="w-1/2 max-w-full"
          src="/HeroImageHM.png"
          alt="Imagen de publicidad de zapatillas Acsis ff blast pure gel"
        />
        <img
          className="w-1/2 max-w-full"
          src="/ProductoHeroImageHM.png"
          alt="Foto zapatillas Acsis ff blast pure gel"
        />
      </div>
      <div className="mt-2 flex flex-col justify-center items-center">
        <h4 className="uppercase text-xl font-bold">
          Zapatillas Acsis ff blast + pure gel
        </h4>
        <p className="font-thin">
          Las Zapatillas Asics FF Blast+ Pure Gel combinan ligereza,
          amortiguación avanzada y un diseño moderno para ofrecer máximo confort
          y rendimiento en cada paso.
        </p>
        <div className="mt-2 mb-2 bg-[#000] text-white px-10 py-1 hover:cursor-pointer">
          <a href="" className="uppercase">
            Comprar
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroHM;
