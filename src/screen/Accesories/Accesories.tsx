import { useEffect, useState } from "react";

import ProductControlsFilter from "../../components/ui/ProductsControlsFilter/ProductsControlsFilter";
import AsideFilters from "../../components/ui/AsideFilters/AsideFIlters";
import FilterHM from "../../components/ui/FilterHM/FilterHM";
import Location from "../../components/ui/Location/Location";
import PublicityBar from "../../components/ui/PublicityBar/PublicityBar";
import ShowMoreButton from "../../components/ui/ShowMoreButton/ShowMoreButton";
import productStore from "../../store/productStore";
import { IProduct } from "../../types/IProduct";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import useProduct from "../../hook/useProduct";

const Accessories: React.FC = () => {
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { products } = productStore();
  const { getProducts } = useProduct();
  const categoryFilter = "accesorios";

  const filteredProducts = products.filter(
    (p) => p.categoria?.nombre.toLowerCase() === categoryFilter && p.activo
  );

  useEffect(() => {
    loadMoreProducts();
  }, []);

  const loadMoreProducts = async () => {
    if (!hasMore) return;
    const data = await getProducts(page, 9);
    if (data) {
      setPage((prev) => prev + 1);
      setHasMore(!data.last);
    }
  };
  return (
    <div>
      <PublicityBar />
      <FilterHM />
      <Location location={"Accesories"} />
      <div className="flex justify-center">
        {filtersVisible && <AsideFilters />}
        <div className="flex-1">
          <ProductControlsFilter
            filtersVisible={filtersVisible}
            onToggleFilters={() => setFiltersVisible((v) => !v)}
          />
          <div className="grid grid-cols-3 gap-6 my-4">
            <span className="text-lg">{filteredProducts.length} productos</span>
            {filteredProducts.map((p: IProduct) => (
              <ProductCard key={p.id} product={p} />
            ))}

            <ShowMoreButton showMore={loadMoreProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;
