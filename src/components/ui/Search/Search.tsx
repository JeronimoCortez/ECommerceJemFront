const Search = () => {
  return (
    <div className="flex justify-around items-center border rounded-full w-[250px] p-2 bg-[#000] text-white">
      <input
        placeholder="Buscar"
        className="all:unset focus:outline-none focus:ring-0"
      />
      <span className="material-symbols-outlined hover:cursor-pointer">
        search
      </span>
    </div>
  );
};

export default Search;
