import { create } from "zustand";
import { IProduct } from "../types/IProduct";
import { IDescuento } from "../types/IDescuento";

interface IProductStore {
  products: IProduct[];
  filteredProductsStore: IProduct[];
  productActive: IProduct | null;
  setProducts: (
    updater: IProduct[] | ((prev: IProduct[]) => IProduct[])
  ) => void;
  setProductActive: (product: IProduct | null) => void;
  addProduct: (newProduct: IProduct) => void;
  addProducts: (newProducts: IProduct[]) => void;
  editProduct: (productUpdate: IProduct) => void;
  deleteProduct: (idProduct: number) => void;
  darAlta: (id: number) => void;
  asignarDescuento: (idProduct: number, descuento: IDescuento) => void;
  eliminarDescuento: (idProducto: number) => void;
  eliminarImagen: (idProducto: number) => void;
  setFilteredProducts: (products: IProduct[]) => void;
}

const productStore = create<IProductStore>()((set) => ({
  products: [],
  productActive: null,
  filteredProductsStore: [],
  setProducts: (updater) =>
    set((state) => ({
      products:
        typeof updater === "function" ? updater(state.products) : updater,
    })),

  setProductActive: (productIn) => set(() => ({ productActive: productIn })),

  addProduct: (newProduct) =>
    set((state) => ({ products: [...state.products, newProduct] })),
  addProducts: (newProducts) =>
    set((state) => {
      const existingIds = new Set(state.products.map((p) => p.id));
      const filtered = newProducts.filter((p) => !existingIds.has(p.id));
      return { products: [...state.products, ...filtered] };
    }),

  editProduct: (productUpdate) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productUpdate.id ? { ...p, ...productUpdate } : p
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, activo: false } : p
      ),
    })),
  darAlta: (id) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, activo: true } : p
      ),
    }));
  },
  asignarDescuento: (idProduct, descuento) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === idProduct
          ? {
              ...p,
              precio: p.precio * (1 - descuento.descuento / 100),
              descuento: descuento,
            }
          : p
      ),
    }));
  },
  eliminarDescuento: (idProduct) => {
    set((state) => ({
      products: state.products.map((p) => {
        if (p.id !== idProduct || !p.descuento) return p;

        const porcentaje = p.descuento.descuento / 100;
        const precioOriginal = p.precio / (1 - porcentaje);

        return {
          ...p,
          precio: precioOriginal,
          descuento: null,
        };
      }),
    }));
  },
  eliminarImagen: (idProducto) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === idProducto ? { ...p, imagen: "" } : p
      ),
    }));
  },
  setFilteredProducts: (products) => {
    set(() => ({
      filteredProductsStore: products,
    }));
  },
}));

export default productStore;
