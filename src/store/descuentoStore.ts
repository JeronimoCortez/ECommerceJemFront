import { create } from "zustand";
import { IDescuento } from "../types/IDescuento";

interface IDescuentoStore{
  descuentos: IDescuento[];
  descuentoActive: IDescuento | null;
  setDescuentoActive: (descuento: IDescuento | null) => void;
  setDescuentos: (descuentos: IDescuento[]) => void;
  addDescuento: (descuento: IDescuento) => void;
  editDescuento: (descuentoUpdate: IDescuento) => void;
  deleteDescuento: (id: number) => void;
}

export const descuentoStore = create<IDescuentoStore>()((set) => ({
  descuentos: [],
  descuentoActive: null,
  setDescuentoActive: (descuentoIn) => set(() => ({ descuentoActive: descuentoIn })),
  setDescuentos: (descuentoArray) => set(() => ({ descuentos: descuentoArray })),
  addDescuento: (newDescuento) =>
    set((state) => ({ descuentos: [...state.descuentos, newDescuento] })),
  editDescuento: (descuentoUpdate) =>
    set((state) => ({
      descuentos: state.descuentos.map((descuento) =>
        descuento.id === descuentoUpdate.id ? { ...descuento, ...descuentoUpdate } : descuento
      ),
    })),
  deleteDescuento: (id) =>
    set((state) => ({
      descuentos: state.descuentos.filter((descuento) => descuento.id !== id),
    })),
}));