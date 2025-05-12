const Carousel = () => {
  return (
    <div className="px-4">
      <h3 className="text-xl font-semibold mb-4">Descubrí lo nuevo</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-left">
          <img
            src="/1284120-1000-1000gorra.webp"
            alt="Gorra"
            className="rounded-md"
          />
          <p className="text-yellow-500 text-sm font-bold">NUEVO</p>
          <p className="text-sm">GORRA NIKE CHELSEA FC</p>
          <p className="font-semibold">$22.899</p>
        </div>
        <div className="text-left">
          <img
            src="/1363428-1000-1000campera.webp"
            alt="Campera"
            className="rounded-md"
          />
          <p className="text-yellow-500 text-sm font-bold">NUEVO</p>
          <p className="text-sm">CAMPERA DEPORTIVA LOS ANGELES LAKERS</p>
          <p className="font-semibold">$89.990</p>
        </div>
        <div className="text-left">
          <img
            src="/1369216-1000-1000botinrojo.webp"
            alt="Botin"
            className="rounded-md"
          />
          <p className="text-yellow-500 text-sm font-bold">NUEVO</p>
          <p className="text-sm">NIKE TIEMPO LEGEND 10 ELITE LX</p>
          <p className="font-semibold">$180.000</p>
        </div>
        <div className="text-left">
          <img
            src="/FigmaPelotaJEM2.webp"
            alt="Pelota"
            className="rounded-md"
          />
          <p className="text-yellow-500 text-sm font-bold">NUEVO</p>
          <p className="text-sm">PREMIER LEAGUE ACADEMY</p>
          <p className="font-semibold">$76.999</p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
