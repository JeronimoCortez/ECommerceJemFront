import { useShallow } from "zustand/shallow";
import { CategoriaService } from "../services/categoriaService";
import categoriaStore from "../store/categoriaStore";
import { ICategoria } from "../types/ICategoria";
import Swal from "sweetalert2";

const categoriaService = new CategoriaService();

const useCategoria = () => {
  const { categories, setCategories, addCategory, deleteCategory, editCategory } =
    categoriaStore(
      useShallow((state) => ({
        categories: state.categories,
        setCategories: state.setCategories,
        addCategory: state.addCategory,
        editCategory: state.editCategory,
        deleteCategory: state.deleteCategory,
      }))
  );

  const getCategories = async () => {
    const data = await categoriaService.getCategorias();
    if (data) setCategories(data);
  };

  const createCategory = async (newCategoria: ICategoria) => {
    try {
      await categoriaService.createCategoria(newCategoria);
      addCategory(newCategoria);
      Swal.fire("Éxito", "Sprint creado correctamente", "success");
    } catch (error) {
      deleteCategory(newCategoria.id);
      console.error("Error: ", error);
    }
  };

  const updateCategory = async (id: number, categoryUpdate: ICategoria) => {
    const estadoPrevio = categories.find((p) => p.id === categoryUpdate.id);
    try {
      await categoriaService.updateCategoria(id, categoryUpdate);
      editCategory(categoryUpdate);
      Swal.fire("Éxito", "Sprint actualizado correctamente", "success");
    } catch (error) {
      if (estadoPrevio) {
        editCategory(estadoPrevio);
      }
      console.error("Error: ", error);
    }
  };

  const deleteCategoryHook = async (id: number) => {
    const estadoPrevio = categories.find((p) => p.id === id);
    const confirm = await Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta accion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    try {
      await categoriaService.deleteCategoria(id), deleteCategory(id);
    } catch (error) {
      if (estadoPrevio) createCategory(estadoPrevio);
      console.error("Error: ", error);
    }
  };

  return {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategoryHook,
  };
};

export default useCategoria;