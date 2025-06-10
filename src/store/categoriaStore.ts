import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ICategoria } from "../types/ICategoria";

interface ICategoriaStore {
  categorias: ICategoria[];
  categoriaActiva: ICategoria | null;
  setCategoriaActiva: (categoria: ICategoria | null) => void;
  setCategorias: (categorias: ICategoria[]) => void;
  addCategoria: (categoria: ICategoria) => void;
  editCategoria: (categoriaActualizada: ICategoria) => void;
  deleteCategoria: (id: number) => void;
}

export const categoriaStore = create<ICategoriaStore>()(
  persist(
    (set) => ({
      categorias: [],
      categoriaActiva: null,

      setCategoriaActiva: (categoria) =>
        set(() => ({ categoriaActiva: categoria })),

      setCategorias: (categorias) =>
        set(() => ({ categorias })),

      addCategoria: (nuevaCategoria) =>
        set((state) => ({
          categorias: [...state.categorias, nuevaCategoria],
        })),

      editCategoria: (categoriaActualizada) =>
        set((state) => ({
          categorias: state.categorias.map((cat) =>
            cat.id === categoriaActualizada.id
              ? { ...cat, ...categoriaActualizada }
              : cat
          ),
        })),

      deleteCategoria: (id) =>
        set((state) => ({
          categorias: state.categorias.filter((cat) => cat.id !== id),
        })),
    }),
    {
      name: "categoria-store",
    }
  )
);
