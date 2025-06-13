import { shoppingCartStore } from "../../../store/shoppingCartStore";
import { IProduct } from "../../../types/IProduct";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addDetalle } = shoppingCartStore();
  const handleAddToCart = () => {
    addDetalle({
      id: new Date().getTime(),
      activo: false,
      cantidad: 0,
      talle: {
        id: 0,
        activo: false,
        talle: "",
        stock: 0,
      },
      producto: product,
    });
  };
  return (
    <div className="px-4 py-4">
      <img
        src={`${product.imagen}`}
        alt={product.nombre}
        className="w-full h-48 object-cover mb-2"
      />
      {/* {isNew && <p className="text-yellow-500 text-sm font-bold">NUEVO</p>} */}
      <p className="text-sm">{product.nombre}</p>
      <p className="font-semibold">${product.precio}</p>
      <button
        onClick={handleAddToCart}
        className="bg-[#000] text-white p-2  rounded cursor-pointer font-bold"
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductCard;
