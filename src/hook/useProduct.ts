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

  return {
    getProducts,
    createProduct,
  };
};
