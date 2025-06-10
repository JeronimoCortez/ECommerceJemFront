import { create } from "zustand";
import { IDetalle } from "../types/IDetalle";

interface IShoppingCartStore {
  detalles: IDetalle[];
  addDetalle: (detalle: IDetalle) => void;
  deleteDetalle: (id: number) => void;
}

export const shoppingCartStore = create<IShoppingCartStore>((set) => ({
  detalles: [],
  addDetalle: (nuevoDetalle) => {
    set((state) => {
      const detalleExiste = state.detalles.some(
        (detalle) => detalle.id === nuevoDetalle.id
      );
      if (detalleExiste) return state;
      return {
        detalles: [...state.detalles, nuevoDetalle],
      };
    });
  },
  deleteDetalle: (id) =>
    set((state) => ({
      detalles: state.detalles.filter((detalle) => detalle.id !== id),
    })),
}));
