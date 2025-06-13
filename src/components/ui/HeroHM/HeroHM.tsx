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
      <div className="mt-4 flex flex-col justify-center items-center text-center">
        <h4 className="uppercase text-xl font-bold">
          Zapatillas Acsis ff blast + pure gel
        </h4>
        <p className="max-w-2xl mx-auto text-gray-700">
          Las nuevas Asics GEL-Pulse FF BLAST+™ combinan amortiguación avanzada,
          ligereza y soporte para que disfrutes de un confort dinámico en cada
          kilómetro. Diseñadas para corredores que buscan rendimiento en
          entrenamientos diarios o largas distancias, estas zapatillas fusionan
          tecnología innovadora con un estilo moderno y versátil.
        </p>
        <div className="mt-2 mb-4 bg-black text-white px-6 py-2 rounded-full hover:cursor-pointer hover:bg-gray-900 transition-colors">
          <a href="/accesories" className="uppercase">
            Comprar
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroHM;
