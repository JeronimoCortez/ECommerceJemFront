import Logo from "../../components/ui/Logo/Logo";
import ProductContent from "../../components/ui/ProductContent/ProductContent";
import PublicityBar from "../../components/ui/PublicityBar/PublicityBar";

const ProductDetails = () => {
  return (
    <>
      <div className="flex w-full bg-[#000] h-[40px] items-center justify-center">
        <Logo className="text-white left-0 absolute p-4 hidden md:block" />
        <PublicityBar />
      </div>
      <ProductContent />
    </>
  );
};

export default ProductDetails;
