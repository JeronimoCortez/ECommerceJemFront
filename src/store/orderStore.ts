import { create } from "zustand";
import { IOrdenCompra } from "../types/IOrdenCompra";

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
      orders: state.orders.filter((order) => order.id !== id),
    })),
}));
