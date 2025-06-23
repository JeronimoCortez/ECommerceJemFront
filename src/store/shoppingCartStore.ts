import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IDetalle } from "../types/IDetalle";

interface IShoppingCartStore {
  detallesShoppingCart: IDetalle[];
  total: number;
  addDetalle: (detalle: IDetalle) => void;
  deleteDetalle: (id: number) => void;
  updateCantidad: (id: number, cantidad: number) => void;
}

export const shoppingCartStore = create<IShoppingCartStore>()(
  persist(
    (set) => ({
      detallesShoppingCart: [],
      total: 0,
      addDetalle: (detalle) => {
        set((state) => {
          const detalleExiste = state.detallesShoppingCart.some(
            (d) =>
              d.producto.id === detalle.producto.id && d.talle === detalle.talle
          );
          if (detalleExiste) return state;
          return {
            detallesShoppingCart: [...state.detallesShoppingCart, detalle],
            total: state.total + detalle.producto.precio * detalle.cantidad,
          };
        });
      },
      deleteDetalle: (id) =>
        set((state) => ({
          detallesShoppingCart: state.detallesShoppingCart.filter(
            (detalle) => detalle.producto.id !== id
          ),
        })),
      updateCantidad: (idProducto: number, cantidad: number) =>
        set((state) => ({
          detallesShoppingCart: state.detallesShoppingCart.map((d) =>
            d.producto.id === idProducto ? { ...d, cantidad } : d
          ),
        })),
    }),
    {
      name: "shopping-cart",
    }
  )
);
