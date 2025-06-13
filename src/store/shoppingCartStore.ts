import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IDetalle } from "../types/IDetalle";

interface IShoppingCartStore {
  detalles: IDetalle[];
  addDetalle: (detalle: IDetalle) => void;
  deleteDetalle: (id: number) => void;
}

export const shoppingCartStore = create<IShoppingCartStore>()(
  persist(
    (set) => ({
      detalles: [],
      addDetalle: (detalle) => {
        set((state) => {
          const detalleExiste = state.detalles.some(
            (d) => d.producto.nombre === detalle.producto.nombre
          );
          if (detalleExiste) return state;
          return {
            detalles: [...state.detalles, detalle],
          };
        });
      },
      deleteDetalle: (id) =>
        set((state) => ({
          detalles: state.detalles.filter(
            (detalle) => detalle.producto.id !== id
          ),
        })),
    }),
    {
      name: "shopping-cart",
    }
  )
);
