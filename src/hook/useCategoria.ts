import { useShallow } from "zustand/shallow";
import { CategoriaService } from "../services/categoriaService";
import { ICategoria } from "../types/ICategoria";
import Swal from "sweetalert2";
import { categoriaStore } from "../store/categoriaStore";

const useCategoria = () => {
  const {
    categorias,
    setCategorias,
    addCategoria,
    deleteCategoria,
    editCategoria,
    setCategoriasPage,
  } = categoriaStore(
    useShallow((state) => ({
      categorias: state.categorias,
      setCategorias: state.setCategorias,
      addCategoria: state.addCategoria,
      editCategoria: state.editCategoria,
      deleteCategoria: state.deleteCategoria,
      setCategoriasPage: state.setCategoriasPage,
    }))
  );
  const categoriaService = new CategoriaService();

  const getCategories = async () => {
    const data = await categoriaService.getCategorias();
    console.log("Categorias recibidas:", data);
    if (Array.isArray(data)) {
      setCategorias(data);
    } else {
      setCategorias([]);
    }
  };

  const getCategoriesPage = async (page: number, size: number = 9) => {
    const data = await categoriaService.getCategoriasPage(page, size);
    if (data) {
      setCategoriasPage((prev: ICategoria[]) => {
        const newProducts = data.content.filter(
          (np) => !prev.some((pp) => pp.id === np.id)
        );
        return [...prev, ...newProducts];
      });
    }
    return data;
  };

  const createCategory = async (newCategoria: ICategoria) => {
    try {
      addCategoria(newCategoria);
      Swal.fire("Éxito", "Sprint creado correctamente", "success");
    } catch (error) {
      deleteCategoria(newCategoria.id);
      console.error("Error: ", error);
    }
  };

  const updateCategory = async (categoryUpdate: ICategoria) => {
    const estadoPrevio = categorias.find((p) => p.id === categoryUpdate.id);
    try {
      await categoriaService.updateCategoria(categoryUpdate);
      editCategoria(categoryUpdate);
      Swal.fire("Éxito", "Sprint actualizado correctamente", "success");
    } catch (error) {
      if (estadoPrevio) {
        editCategoria(estadoPrevio);
      }
      console.error("Error: ", error);
    }
  };

  const deleteCategoryHook = async (id: number) => {
    const estadoPrevio = categorias.find((p) => p.id === id);
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
      await categoriaService.deleteCategoria(id), deleteCategoria(id);
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
    getCategoriesPage,
  };
};

export default useCategoria;
