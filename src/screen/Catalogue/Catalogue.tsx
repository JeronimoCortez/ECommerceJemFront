import { useEffect, useState } from "react";
import productStore from "../../store/productStore";
import PublicityBar from "../../components/ui/PublicityBar/PublicityBar";
import FilterHM from "../../components/ui/FilterHM/FilterHM";
import Location from "../../components/ui/Location/Location";
import { IProduct } from "../../types/IProduct";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import { ProductService } from "../../services/productService";

const Catalogue = () => {
  const { gender, category } = useParams();
  const { products, filteredProductsStore } = productStore();
  const genderFilter = gender?.toLowerCase();
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const productService = new ProductService();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productService.getAllActivos();
      if (data) {
        setAllProducts(data);
      }
    };

    fetchProducts();
  }, []);

  let filteredProducts;
  if (genderFilter === "niños") {
    filteredProducts = allProducts.filter(
      (p) =>
        p.genero?.toLowerCase() === "niño" ||
        (p.genero?.toLowerCase() === "niña" && p.activo)
    );
  } else if (category) {
    filteredProducts = allProducts.filter((p) => {
      return (
        p.genero?.toLowerCase() === genderFilter &&
        p.categoria.nombre.toLowerCase().includes(category.toLowerCase()) &&
        p.activo
      );
    });
  } else if (filteredProductsStore.length > 0) {
    filteredProducts = filteredProductsStore;
  } else {
    filteredProducts = allProducts.filter(
      (p) => p.genero?.toLowerCase() === genderFilter && p.activo
    );
    console.log(products);
    console.log(filteredProducts);
  }

  return (
    <div>
      <PublicityBar />
      <FilterHM />
      <Location location={String(gender)} />
      <div className="flex justify-center">
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-6 my-4">
            <span className="text-lg">{filteredProducts.length} productos</span>
            {filteredProducts.map((p: IProduct) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
