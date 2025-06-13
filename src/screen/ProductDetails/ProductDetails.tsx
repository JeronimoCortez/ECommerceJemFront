import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductContent from "../../components/ui/ProductContent/ProductContent";
import PublicityBar from "../../components/ui/PublicityBar/PublicityBar";
import Logo from "../../components/ui/Logo/Logo";
import productStore from "../../store/productStore";
import { ProductService } from "../../services/productService";


const ProductDetails = () => {
  const { id } = useParams();
  const { productActive, setProductActive, products } = productStore();
  const service = new ProductService();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const productId = parseInt(id);
      try {
        const product = await service.getProduct(productId);
        setProductActive(product!); 
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchProduct();
  }, [id, products, setProductActive]);

  return (
    <>
      <div className="flex w-full bg-[#000] h-[40px] items-center justify-center">
        <Logo className="text-white left-0 absolute p-4 hidden md:block" />
        <PublicityBar />
      </div>
      <ProductContent product={productActive!} />
    </>
  );
};

export default ProductDetails;