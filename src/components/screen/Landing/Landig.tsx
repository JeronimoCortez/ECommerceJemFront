import { ShoppingCart, Search } from "@mui/icons-material";

const Landing = () => {
  return (
    <div>
      <div className="bg-gray-300 text-black text-right py-1 text-sm">
        <a href="#" className="mr-6">
          Iniciar Sesion / Registrarse
        </a>
      </div>
      <div className="flex justify-between items-center p-4">
        <div className="text-4xl font-jacquard font-black">JEM</div>
        {/* // tailwind.config.js
          export default {
          theme: {
            extend: {
              fontFamily: {
                jacquard: ['"Jacquard 24"', 'cursive'], // asegúrate de las comillas dobles si hay espacios
              },
            },
          },
        } */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar"
              className="pl-10 pr-4 py-2 rounded-full bg-black text-white placeholder-white border border-black focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-white" />
          </div>
          <ShoppingCart className="cursor-pointer" />
        </div>
      </div>
      <nav className="flex justify-center space-x-6 text-lg font-medium mt-2 mb-6">
        <a href="#">Hombre</a>
        <a href="#">Mujer</a>
        <a href="#">Niño/a</a>
        <a href="#">Accesorios</a>
      </nav>
      <div className="w-full mt-6">
        <img
          src="/ac7139ea-c00a-402f-a93c-47cb3b20315f___c4541474895a077b3a718ac472773a3f.webp"
          alt="Banner principal"
          className="w-full h-auto rounded-md object-cover"
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
        <button className="mt-4 bg-black text-white px-6 py-2 rounded-full">
          Ver más...
        </button>
      </div>
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
    </div>
  );
};

export default Landing;
