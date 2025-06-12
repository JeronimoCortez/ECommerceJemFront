import { FC } from "react";
import { useNavigate } from "react-router-dom";


interface SeeMoreButtonProps {
  productId: number;
}

const SeeMoreButton: FC<SeeMoreButtonProps> = ({ productId }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      navigate(`/product/${productId}`);
    } catch (error) {
      console.error("Error al navegar:", error);
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:cursor-pointer hover:bg-gray-800 transition-colors"
    >
      Ver más...
    </button>
  );
};

export default SeeMoreButton;