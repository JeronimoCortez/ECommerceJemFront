import { create } from "zustand";
import { IProduct } from "../types/IProduct";

interface IProductStore {
  products: IProduct[];
  productActive: IProduct | null;
  setProducts: (
    updater: IProduct[] | ((prev: IProduct[]) => IProduct[])
  ) => void;
  setProductActive: (product: IProduct | null) => void;
  addProduct: (newProduct: IProduct) => void;
  editProduct: (productUpdate: IProduct) => void;
  deleteProduct: (idProduct: number) => void;
}

const productStore = create<IProductStore>()((set) => ({
  products: [],
  productActive: null,

  setProducts: (updater) =>
    set((state) => ({
      products:
        typeof updater === "function" ? updater(state.products) : updater,
    })),

  setProductActive: (productIn) => set(() => ({ productActive: productIn })),

  addProduct: (newProduct) =>
    set((state) => ({ products: [...state.products, newProduct] })),

  editProduct: (productUpdate) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productUpdate.id ? { ...p, ...productUpdate } : p
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
}));

export default productStore;