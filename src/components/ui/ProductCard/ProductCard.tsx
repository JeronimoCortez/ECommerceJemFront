import { useNavigate } from "react-router-dom";
import { shoppingCartStore } from "../../../store/shoppingCartStore";
import { IProduct } from "../../../types/IProduct";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addDetalle } = shoppingCartStore();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    addDetalle({
      id: new Date().getTime(),
      activo: false,
      cantidad: 1,
      talle: "",
      producto: product,
    });
  };

  const handleNavigateToDetailProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="px-4 py-4 cursor-pointer"
      onClick={handleNavigateToDetailProduct}
    >
      <img
        src={`${product.imagen}`}
        alt={product.nombre}
        className="w-full h-48 object-cover mb-2"
      />
      {/* {isNew && <p className="text-yellow-500 text-sm font-bold">NUEVO</p>} */}
      <p className="text-sm">{product.nombre}</p>
      <p className="font-semibold">${product.precio}</p>
      {/* <button
        onClick={handleAddToCart}
        className="bg-[#000] text-white p-2  rounded cursor-pointer font-bold"
      >
        Añadir al carrito
      </button> */}
    </div>
  );
};

export default ProductCard;
