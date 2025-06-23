import { useEffect, useState } from "react";
import { ProductService } from "../../../services/productService";
import { IProduct } from "../../../types/IProduct";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const productService = new ProductService();
  const [products, setProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = await productService.getNuevos();
    if (data) setProducts(data);
  };

  const handleNavigateToDetail = (idProducto: number) => {
    navigate(`/product/${idProducto}`);
  };
  return (
    <div className="px-4">
      <h3 className="text-xl font-semibold mb-4">Descubrí lo nuevo</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((p) => (
          <div
            className="text-left cursor-pointer"
            key={p.id}
            onClick={() => handleNavigateToDetail(p.id)}
          >
            <img
              src={p.imagen || "../NoImage.png"}
              alt={`${p.nombre}`}
              className="rounded-md w-[16rem] h-[16rem] object-cover"
            />
            <p className="text-yellow-500 text-sm font-bold">NUEVO</p>
            <p className="text-sm">{p.nombre}</p>
            <p className={`${p.descuento && "text-green-500"} font-semibold`}>
              ${p.precio}{" "}
              <span className={`${p.descuento ? "text-gray-500" : "hidden"}`}>
                -%{p.descuento?.descuento}
              </span>
            </p>
            <p
              className={`${p.descuento ? "text-gray-500" : "hidden"} text-xs`}
            >
              *Descuento ya aplicado
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
