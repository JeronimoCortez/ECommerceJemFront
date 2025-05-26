import { useState } from "react";
import ProductCard, {
  Product,
} from "../../components/ui/ProductCard/ProductCard";
import ProductControlsFilter from "../../components/ui/ProductsControlsFilter/ProductsControlsFilter";
import AsideFilters from "../../components/ui/AsideFilters/AsideFIlters";
import FilterHM from "../../components/ui/FilterHM/FilterHM";
import Location from "../../components/ui/Location/Location";
import PublicityBar from "../../components/ui/PublicityBar/PublicityBar";
import ShowMoreButton from "../../components/ui/ShowMoreButton/ShowMoreButton";

const sampleProducts: Product[] = [
  {
    id: 1,
    image: "/1284120-1000-1000gorra.webp",
    title: "GORRA NIKE CHELSEA FC",
    price: 22899,
    isNew: true,
  },
  {
    id: 2,
    image: "/public/FigmaPelotaJEM2.webp",
    title: "PREMIER LEAGUE ACADEMY",
    price: 25999,
    isNew: false,
  },
  {
    id: 3,
    image: "/public/1363428-1000-1000campera.webp",
    title: "CAMPERA NIKE SPORTWEAR",
    price: 71399,
    isNew: true,
  },
  {
    id: 4,
    image: "/public/1369216-1000-1000botinrojo.webp",
    title: "BOTINES NIKE PHANTOM",
    price: 249999,
    isNew: false,
  },
  {
    id: 5,
    image: "/1284120-1000-1000gorra.webp",
    title: "GORRA NIKE CHELSEA FC",
    price: 22899,
    isNew: true,
  },
  {
    id: 6,
    image: "/public/FigmaPelotaJEM2.webp",
    title: "PREMIER LEAGUE ACADEMY",
    price: 25999,
    isNew: false,
  },
  {
    id: 7,
    image: "/public/1363428-1000-1000campera.webp",
    title: "CAMPERA NIKE SPORTWEAR",
    price: 71399,
    isNew: true,
  },
  {
    id: 8,
    image: "/public/1369216-1000-1000botinrojo.webp",
    title: "BOTINES NIKE PHANTOM",
    price: 249999,
    isNew: false,
  },
  {
    id: 9,
    image: "/public/FigmaPelotaJEM2.webp",
    title: "PREMIER LEAGUE ACADEMY",
    price: 25999,
    isNew: false,
  },
];

const Accessories: React.FC = () => {
  const [filtersVisible, setFiltersVisible] = useState(true);

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
            {sampleProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
            <ShowMoreButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;
