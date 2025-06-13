import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductContent from "../../components/ui/ProductContent/ProductContent";
import PublicityBar from "../../components/ui/PublicityBar/PublicityBar";
import Logo from "../../components/ui/Logo/Logo";
import productStore from "../../store/productStore";
import { ProductService } from "../../services/productService";

const ProductDetails = () => {
  const { id } = useParams();
  const { productActive, setProductActive } = productStore();
  const productService = new ProductService();

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await productService.getProduct(Number(id));
      if (product) {
        setProductActive(product);
      }
    };
    fetchProduct();
  }, []);

  return (
    <>
      <div className="flex w-full bg-[#000] h-[40px] items-center justify-center">
        <Logo className="text-white left-0 absolute p-4 hidden md:block" />
        <PublicityBar />
      </div>
      {productActive ? (
        <ProductContent product={productActive} />
      ) : (
        <p className="text-center text-xl font-bold">
          Error al cargar producto
        </p>
      )}
    </>
  );
};

export default ProductDetails;
