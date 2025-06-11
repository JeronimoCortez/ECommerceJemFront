import { useEffect, useState } from "react";
import productStore from "../../store/productStore";
import useProduct from "../../hook/useProduct";
import PublicityBar from "../../components/ui/PublicityBar/PublicityBar";
import FilterHM from "../../components/ui/FilterHM/FilterHM";
import Location from "../../components/ui/Location/Location";
import AsideFilters from "../../components/ui/AsideFilters/AsideFIlters";
import ProductControlsFilter from "../../components/ui/ProductsControlsFilter/ProductsControlsFilter";
import { IProduct } from "../../types/IProduct";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import ShowMoreButton from "../../components/ui/ShowMoreButton/ShowMoreButton";
import { useParams } from "react-router-dom";

const Catalogue = () => {
  const { gender } = useParams();
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { products } = productStore();
  const { getProducts } = useProduct();
  const genderFilter = gender?.toLowerCase();

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

  const filteredProducts = products.filter((p) => p.gender === genderFilter);

  return (
    <div>
      <PublicityBar />
      <FilterHM />
      <Location location={String(gender)} />
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

export default Catalogue;
