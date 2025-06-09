import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProduct } from "../types/IProduct";

interface IProductStore {
  products: IProduct[];
  productActive: IProduct | null;
  setProducts: (products: IProduct[]) => void;
  addProduct: (product: IProduct) => void;
  editProduct: (productUpdate: IProduct) => void;
  deleteProduct: (id: number) => void;
  setProductActive: (product: IProduct | null) => void;
}

export const productStore = create<IProductStore>()(
  persist(
    (set) => ({
      products: [],
      productActive: null,
      setProducts: (productsArray) => set(() => ({ products: productsArray })),
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
      setProductActive: (p) => set(() => ({ productActive: p })),
    }),
    {
      name: "product-store",
    }
  )
);
