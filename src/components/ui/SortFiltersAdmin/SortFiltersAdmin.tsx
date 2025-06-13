import { useState, useRef, useEffect } from "react";
import UpArrow from "../UpArrow/UpArrow";

interface Props {
  options: string[];
  selected: string;
  onSelect: (opt: string) => void;
}

const SortFiltersAdmin: React.FC<Props> = ({ options, selected, onSelect }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        className="flex items-center text-lg hover:underline cursor-pointer"
        onClick={() => setOpen(o => !o)}
      >
        <span>Filtros</span>
        <div className={`ml-[1px] mt-[1px] transform transition-transform duration-500 ${open ? "rotate-180" : ""}`}>
          <UpArrow />
        </div>
      </button>
      {open && (
        <div className="absolute top-full bg-white drop-shadow-xl w-48 z-10">
          <ul>
            {options.map(opt => (
              <li key={opt}>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => { onSelect(opt); setOpen(false); }}
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

export default SortFiltersAdmin;