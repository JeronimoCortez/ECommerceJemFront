export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  isNew: boolean;
}

interface ProductCardProps extends Product {}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, isNew }) => (
  <div className="px-4 py-4">
    <img src={image} alt={title} className="w-full h-48 object-cover mb-2" />
    {isNew && <p className="text-yellow-500 text-sm font-bold">NUEVO</p>}
    <p className="text-sm">{title}</p>
    <p className="font-semibold">${price.toLocaleString()}</p>
  </div>
);

export default ProductCard;
