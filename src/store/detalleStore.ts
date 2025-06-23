import { create } from "zustand";
import { IDetalle } from "../types/IDetalle";

interface IDetalleStore {
  detalles: IDetalle[];
  setArrayDetalles: (detalles: IDetalle[]) => void;
}

export const DetalleStore = create<IDetalleStore>()((set) => ({
  detalles: [],
  setArrayDetalles: (detalles) => set(() => ({ detalles })),
}));
