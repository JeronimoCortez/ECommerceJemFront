import { Icon } from "@iconify/react/dist/iconify.js";

const Search = () => {
  return (
    <div className="flex justify-around items-center border rounded-full w-[250px] p-2 bg-[#000] text-white">
      <input
        placeholder="Buscar"
        className="all:unset focus:outline-none focus:ring-0"
      />
      <Icon icon="mdi:magnify" className="hover:cursor-pointer text-xl" />
    </div>
  );
};

export default Search;
