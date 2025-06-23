import { create } from "zustand";
import { IOrdenCompra } from "../types/IOrdenCompra";
import { Estado } from "../types/enums/Estado.enum";

interface IOrderStore {
  orders: IOrdenCompra[];
  orderActive: IOrdenCompra | null;
  setOrderActive: (order: IOrdenCompra | null) => void;
  setOrders: (
    updater: IOrdenCompra[] | ((prev: IOrdenCompra[]) => IOrdenCompra[])
  ) => void;
  addOrder: (order: IOrdenCompra) => void;
  editOrder: (orderUpdate: IOrdenCompra) => void;
  deleteOrder: (id: number) => void;
  altaOrder: (id: number) => void;
  modificarEstado: (id: number, estado: Estado) => void;
}

export const orderStore = create<IOrderStore>()((set) => ({
  orders: [],
  orderActive: null,
  setOrderActive: (orderIn) => set(() => ({ orderActive: orderIn })),
  setOrders: (updater) =>
    set((state) => ({
      orders: typeof updater === "function" ? updater(state.orders) : updater,
    })),
  addOrder: (newOrder) =>
    set((state) => ({ orders: [...state.orders, newOrder] })),
  editOrder: (orderUpdate) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderUpdate.id ? { ...order, ...orderUpdate } : order
      ),
    })),
  deleteOrder: (id) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, activo: false } : order
      ),
    })),
  altaOrder: (id) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, activo: true } : order
      ),
    })),
  modificarEstado: (id, estado) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, estado: estado } : order
      ),
    })),
}));
