import { Icon } from "@iconify/react/dist/iconify.js";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import productStore from "../../../store/productStore";
import Fuse from "fuse.js";
import { IProduct } from "../../../types/IProduct";
import { ProductService } from "../../../services/productService";

const Search = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<IProduct[]>([]);
  const navigate = useNavigate();
  const productService = new ProductService();
  const { setFilteredProducts, setProducts, products } = productStore();

  useEffect(() => {
    const loadProducts = async () => {
      if (products.length === 0) {
        const data = await productService.getAllActivos();
        if (data) {
          setProducts(data);
        }
      }
    };

    loadProducts();
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ["nombre", "marca", "color"],
      threshold: 0.3,
    });
  }, [products]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    console.log("Input:", value);
    console.log("Resultados:", fuse.search(value));
    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const results = fuse
        .search(value)
        .slice(0, 5)
        .map((r) => r.item);
      setSuggestions(results);
    }
    console.log("sugestions: ", suggestions);
  };

  const handleSuggestionClick = (product: IProduct) => {
    navigate(`/product/${product.id}`);
    setInput("");
    setSuggestions([]);
  };

  const handleSearch = () => {
    if (!input.trim()) return;
    const result = fuse.search(input).map((r) => r.item);
    setFilteredProducts(result);
    navigate("/catalogue");
  };

  return (
    <div className="relative w-[250px]">
      <div className="flex justify-around items-center border rounded-full p-2 bg-[#000] text-white">
        <Icon
          icon="mdi:magnify"
          className="hover:cursor-pointer text-xl"
          onClick={handleSearch}
        />
        <input
          placeholder="Buscar"
          className="all:unset focus:outline-none focus:ring-0 w-full ml-2"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 left-0 w-full bg-white text-black shadow-md rounded-md z-50 max-h-60 overflow-y-auto">
          {suggestions.map((product) => (
            <li
              key={product.id}
              className="p-2 hover:bg-gray-200 cursor-pointer text-sm "
              onClick={() => handleSuggestionClick(product)}
            >
              {product.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
