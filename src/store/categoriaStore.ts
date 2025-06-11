import { create } from "zustand";
import { ICategoria } from "../types/ICategoria";

interface ICategoryStore {
  categories: ICategoria[];
  categoryActive: ICategoria | null;
  setCategoryActive: (category: ICategoria | null) => void;
  setCategories: (categories: ICategoria[]) => void;
  addCategory: (category: ICategoria) => void;
  editCategory: (categoryUpdate: ICategoria) => void;
  deleteCategory: (id: number) => void;
}

export const categoriaStore = create<ICategoryStore>()((set) => ({
  categories: [],
  categoryActive: null,
  setCategoryActive: (categoryIn) => set(() => ({ categoryActive: categoryIn })),
  setCategories: (categoryArray) => set(() => ({ categories: categoryArray })),
  addCategory: (newCategory) =>
    set((state) => ({ categories: [...state.categories, newCategory] })),
  editCategory: (categoryUpdate) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryUpdate.id ? { ...category, ...categoryUpdate } : category
      ),
    })),
  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
}));

export default categoriaStore;