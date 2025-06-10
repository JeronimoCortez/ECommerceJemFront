import { ProductService } from "../services/productService";
import productStore from "../store/productStore";
import { useShallow } from "zustand/shallow";
import { IProduct } from "../types/IProduct";
import Swal from "sweetalert2";

const productService = new ProductService();

const useProduct = () => {
  const { products, setProducts, addProduct, deleteProduct, editProduct } =
    productStore(
      useShallow((state) => ({
        products: state.products,
        setProducts: state.setProducts,
        addProduct: state.addProduct,
        editProduct: state.editProduct,
        deleteProduct: state.deleteProduct,
      }))
    );

  const getProducts = async () => {
    const data = await productService.getProducts();
    if (data) setProducts(data);
  };

  const createProduct = async (newProduct: IProduct) => {
    try {
      await productService.createProduct(newProduct);
      addProduct(newProduct);
      Swal.fire("Éxito", "Sprint creado correctamente", "success");
    } catch (error) {
      deleteProduct(newProduct.id);
      console.error("Error: ", error);
    }
  };

  const updateProduct = async (id: number, productUpdate: IProduct) => {
    const estadoPrevio = products.find((p) => p.id === productUpdate.id);
    try {
      await productService.updateProduct(id, productUpdate);
      editProduct(productUpdate);
      Swal.fire("Éxito", "Sprint actualizado correctamente", "success");
    } catch (error) {
      if (estadoPrevio) {
        editProduct(estadoPrevio);
      }
      console.error("Error: ", error);
    }
  };

  const deleteProductHook = async (id: number) => {
    const estadoPrevio = products.find((p) => p.id === id);
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
      await productService.deleteProduct(id), deleteProduct(id);
    } catch (error) {
      if (estadoPrevio) createProduct(estadoPrevio);
      console.error("Error: ", error);
    }
  };

  return {
    getProducts,
    createProduct,
    updateProduct,
    deleteProductHook,
  };
};

export default useProduct;
