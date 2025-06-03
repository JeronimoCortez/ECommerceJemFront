import { ITalle } from "../../../types/ITalle";
import { useEffect, useState } from "react";

interface TallesModalProps {
  isOpen: boolean;
  initialTalles: ITalle[];
  onClose: () => void;
  onSave: (talles: ITalle[]) => void;
}

const posiblesTallesAlfabeticos = ["XS", "S", "M", "L", "XL", "XXL"];
const posiblesTallesNumericos = [36, 37, 38, 39, 40, 41, 42, 43, 44];

const TallesModal = ({ isOpen, initialTalles, onClose, onSave }: TallesModalProps) => {
  const [tipo, setTipo] = useState<"alfabetico" | "numerico">("alfabetico");
  const [talles, setTalles] = useState<ITalle[]>([]);

  // Inicializa los talles cuando abre el modal
  useEffect(() => {
    if (isOpen) {
      setTalles(initialTalles || []);
    }
  }, [isOpen, initialTalles]);

  
  const handleStockChange = (talleValue: string | number, nuevoStock: number) => {
    const nuevosTalles = talles.map((t) =>
      t.talle === talleValue ? { ...t, stock: nuevoStock } : t
    );
    setTalles(nuevosTalles);
  };

  const handleTipoChange = (nuevoTipo: "alfabetico" | "numerico") => {
    setTipo(nuevoTipo);
    setTalles([]); // Limpiamos al cambiar de tipo
  };

  const toggleTalle = (talleValue: string | number) => {
    const index = talles.findIndex((t) => t.talle === talleValue);
    if (index !== -1) {
      // Si ya está, lo eliminamos
      const nuevosTalles = [...talles];
      nuevosTalles.splice(index, 1);
      setTalles(nuevosTalles);
    } else {
      // Si no está, lo agregamos con stock 0
      const nuevoTalle: ITalle = {
        id: Date.now(),
        talle: talleValue,
        stock: 0,
        activo: true,
      };
      setTalles([...talles, nuevoTalle]);
    }
  };

  const posiblesTalles = tipo === "alfabetico" ? posiblesTallesAlfabeticos : posiblesTallesNumericos;

  if (!isOpen) return null;

  return(
    <div className="fixed inset-0 bg-whiteborder flex items-center justify-center z-50 mx-auto">
      <div className="bg-white p-6 w-[90vw] max-w-md border border-black">
        <h2 className="text-xl font-bold mb-4 text-center">Seleccionar Talles</h2>

        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${tipo === "alfabetico" ? "bg-black text-white" : "bg-gray-200"}`}
            onClick={() => handleTipoChange("alfabetico")}
          >
            Alfabético
          </button>
          <button
            className={`px-4 py-2 rounded ${tipo === "numerico" ? "bg-black text-white" : "bg-gray-200"}`}
            onClick={() => handleTipoChange("numerico")}
          >
            Numérico
          </button>
        </div>

        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
          {posiblesTalles.map((talle) => {
            const existente = talles.find((t) => t.talle === talle);
            return (
              <div key={talle} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!existente}
                  onChange={() => toggleTalle(talle)}
                />
                <label className="w-16">{talle}</label>
                <input
                  type="number"
                  min={0}
                  value={existente?.stock ?? 0}
                  disabled={!existente}
                  onChange={(e) => handleStockChange(talle, Number(e.target.value))}
                  className="border p-1 w-24"
                  placeholder="Stock"
                />
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-between">
          <button className="bg-gray-300 px-4 py-2 rounded cursor-pointer" onClick={onClose}>
            Cancelar
          </button>
          <button className="bg-black text-white px-4 py-2 rounded cursor-pointer" onClick={() => onSave(talles)}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default TallesModal;