const Filter = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <h4 className="text-2xl font-bold">JEM</h4>
      <div>
        <div className="flex justify-around items-center font-bold">
          <a href="">Hombre</a>
          <a href="">Mujer</a>
          <a href="">Niño/a</a>
          <a href="">Accesorios</a>
        </div>
        <div className="flex justify-between items-center gap-6 ">
          <a href="">Ver todo en {"Categoria"}</a>
          <a href="">Calzado</a>
          <a href="">Ropa</a>
          <a href="">Accesorios</a>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex justify-around items-center border rounded-full w-[250px] p-2 bg-[#000] text-white">
          <input
            placeholder="Buscar"
            className="all:unset focus:outline-none focus:ring-0"
          />
          <span className="material-symbols-outlined hover:cursor-pointer">
            search
          </span>
        </div>
        <span className="material-symbols-outlined">shopping_bag</span>
      </div>
    </div>
  );
};

export default Filter;
