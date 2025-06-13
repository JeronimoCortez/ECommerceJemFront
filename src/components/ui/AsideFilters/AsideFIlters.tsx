import { useState } from "react";
import CheckButton from "../CheckButton/CheckButton";
import { Icon } from '@iconify/react/dist/iconify.js';
import UpArrow from "../UpArrow/UpArrow";

const categories = ["Botines", "Zap. Deportivas", "Zap. Urbanas"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const brands = ["Nike", "Adidas", "Vans", "Umbro"];
const colors = ["red", "orange", "yellow", "green", "blue", "cyan", "black", "white"];
const productTypes = ["Guantes", "Botellas", "Accesorios"];

const AsideFilters = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [openSection, setOpenSection] = useState<string>("");
  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? "" : section));
  };
  const arrowClass = (section: string) =>
    openSection !== section
      ? 'transform transition-transform duration-500'
      : 'transform rotate-180 transition-transform duration-500';

  return (
    <aside className="w-60 p-4">
      <h3 className="text-lg font-semibold mb-4">Filtros</h3>
      <div className="mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('Categoría')}>
          <h4 className="font-semibold">Categoría</h4>
          <div className={arrowClass('Categoría')}>
            <UpArrow/>
          </div>
        </div>
        {openSection === 'Categoría' && (
          <div className="space-y-2 mt-2">
            {categories.map(cat => (
              <div key={cat} className="flex justify-between items-center">
                <span>{cat}</span>
                <CheckButton
                  checked={selectedCategory === cat}
                  onClick={() => setSelectedCategory(prev => (prev === cat ? "" : cat))}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('Talle')}>
          <h4 className="font-semibold">Talle</h4>
          <div className={arrowClass('Talle')}>
            <UpArrow />
          </div>
        </div>
        {openSection === 'Talle' && (
          <div className="grid grid-cols-3 gap-1 mt-2">
            {sizes.map(sz => (
              <div
                key={sz}
                onClick={() => setSelectedSize(prev => (prev === sz ? "" : sz))}
                className={
                  `flex items-center justify-center w-12 h-12 shadow-md cursor-pointer border ` +
                  (selectedSize === sz ? 'bg-black text-white' : 'bg-white text-black')
                }
              >
                {sz}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('Marca')}>
          <h4 className="font-semibold">Marca</h4>
          <div className={arrowClass('Marca')}>
            <UpArrow />
          </div>
        </div>
        {openSection === 'Marca' && (
          <div className="space-y-2 mt-2">
            {brands.map(b => (
              <div key={b} className="flex justify-between items-center">
                <span>{b}</span>
                <CheckButton
                  checked={selectedBrand === b}
                  onClick={() => setSelectedBrand(prev => (prev === b ? "" : b))}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('Color')}>
          <h4 className="font-semibold">Color</h4>
          <div className={arrowClass('Color')}>
            <UpArrow />
          </div>
        </div>
        {openSection === 'Color' && (
          <div className="flex gap-2 flex-wrap mt-2">
            {colors.map(c => {
              const isSel = selectedColor === c;
              const checkColor = c === 'white' ? 'black' : 'white';
              return (
                <div key={c} className="relative">
                  <div
                    className="w-8 h-8 rounded-full cursor-pointer border"
                    style={{ backgroundColor: c }}
                    onClick={() => setSelectedColor(prev => (prev === c ? "" : c))}
                  />
                  {isSel && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon icon="basil:check-outline" width="20" height="20" color={checkColor} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('Tipo de Producto')}>
          <h4 className="font-semibold">Tipo de Producto</h4>
          <div className={arrowClass('Tipo de Producto')}>
            <UpArrow />
          </div>
        </div>
        {openSection === 'Tipo de Producto' && (
          <div className="space-y-2 mt-2">
            {productTypes.map(pt => (
              <div key={pt} className="flex justify-between items-center">
                <span>{pt}</span>
                <CheckButton
                  checked={selectedType === pt}
                  onClick={() => setSelectedType(prev => (prev === pt ? "" : pt))}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default AsideFilters;
