import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import UpArrow from "../UpArrow/UpArrow";

interface Props {
  filtersVisible: boolean;
  onToggleFilters: () => void;
}

const sortOptions = [
  "Relevancia",
  "Más Reciente",
  "Precio Más alto",
  "Precio Más bajo",
  "A - Z",
  "Z - A"
];

const ProductControlsFilter: React.FC<Props> = ({
  filtersVisible,
  onToggleFilters,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Más Reciente");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isSortOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSortOpen]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center p-2">
        <span className="text-lg">187 Productos</span>
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleFilters}
            className="flex items-center text-lg hover:underline"
          >
            {filtersVisible ? "Ocultar Filtros" : "Mostrar Filtros"}
            <Icon
              icon="material-symbols:page-info-outline"
              className="ml-1 mt-1"
              width="24"
              height="24"
            />
          </button>
          <div
            className="flex items-center text-lg cursor-pointer select-none"
            onClick={() => setIsSortOpen((o) => !o)}
          >
            <span>
              Ordenar por: <span className="font-semibold">{selectedSort}</span>
            </span>
            <div
              className={`ml-1 transform transition-transform duration-300 ${
                isSortOpen ? "rotate-180" : ""
              }`}
            >
              <UpArrow />
            </div>
          </div>
        </div>
      </div>
      {isSortOpen && (
        <div
          ref={containerRef}
          className="absolute top-full right-0 bg-white drop-shadow-xl w-48 z-10"
        >
          <ul className="divide-y">
            {sortOptions.map((opt) => (
              <li key={opt}>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    setSelectedSort(opt);
                    setIsSortOpen(false);
                  }}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductControlsFilter;
