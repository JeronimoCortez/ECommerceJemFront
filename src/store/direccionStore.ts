import { create } from "zustand";
import { IDireccion } from "../types/IDireccion";

interface IDireccionStore {
  direcciones: IDireccion[];
  direccionActive: IDireccion | null;
  setDireccionActive: (direccion: IDireccion | null) => void;
  setDirecciones: (direcciones: IDireccion[]) => void;
  addDireccion: (direccion: IDireccion) => void;
  editDireccion: (direccionUpdate: IDireccion) => void;
  deleteDireccion: (id: number) => void;
}

export const direccionStore = create<IDireccionStore>()((set) => ({
  direcciones: [],
  direccionActive: null,
  setDireccionActive: (direccionIn) => set(() => ({ direccionActive: direccionIn })),
  setDirecciones: (direccionArray) => set(() => ({ direcciones: direccionArray })),
  addDireccion: (newDireccion) =>
    set((state) => ({ direcciones: [...state.direcciones, newDireccion] })),
  editDireccion: (direccionUpdate) =>
    set((state) => ({
      direcciones: state.direcciones.map((direccion) =>
        direccion.id === direccionUpdate.id ? { ...direccion, ...direccionUpdate } : direccion
      ),
    })),
  deleteDireccion: (id) =>
    set((state) => ({
      direcciones: state.direcciones.filter((direccion) => direccion.id !== id),
    })),
}));