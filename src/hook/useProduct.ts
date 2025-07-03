import { ProductService } from "../services/productService";
import productStore from "../store/productStore";
import { useShallow } from "zustand/shallow";
import { IProduct } from "../types/IProduct";
import Swal from "sweetalert2";
import { IDescuento } from "../types/IDescuento";
import { ImagenService } from "../services/imagenService";

const productService = new ProductService();
const imagenService = new ImagenService();

const useProduct = () => {
  const {
    products,
    setProducts,
    addProduct,
    addProducts,
    deleteProduct,
    editProduct,
    darAlta,
    asignarDescuento,
    eliminarDescuento,
    eliminarImagen,
  } = productStore(
    useShallow((state) => ({
      products: state.products,
      setProducts: state.setProducts,
      addProduct: state.addProduct,
      addProducts: state.addProducts,
      editProduct: state.editProduct,
      deleteProduct: state.deleteProduct,
      darAlta: state.darAlta,
      asignarDescuento: state.asignarDescuento,
      eliminarDescuento: state.eliminarDescuento,
      eliminarImagen: state.eliminarImagen,
    }))
  );

  // const getProducts = async (page: number, size: number = 9) => {
  //   const data = await productService.getProducts(page, size);
  //   if (data) {
  //     setProducts((prev: IProduct[]) => {
  //       const newProducts = data.content.filter(
  //         (np) => !prev.some((pp) => pp.id === np.id)
  //       );
  //       return [...prev, ...newProducts];
  //     });
  //   }
  //   return data;
  // };
  const getProducts = async (page: number, size: number) => {
    const data = await productService.getProducts(page, size);
    if (data) {
      addProducts(data.content);
    }

    return data;
  };

  const createProduct = async (newProduct: IProduct) => {
    try {
      addProduct(newProduct);
      Swal.fire("Éxito", "Producto creado correctamente", "success");
    } catch (error) {
      deleteProduct(newProduct.id);
      console.error("Error: ", error);
    }
  };

  const updateProduct = async (productUpdate: IProduct) => {
    const estadoPrevio = products.find((p) => p.id === productUpdate.id);
    try {
      await productService.updateProduct(productUpdate);
      editProduct(productUpdate);
      Swal.fire("Éxito", "Producto actualizado correctamente", "success");
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
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    try {
      await productService.deleteProduct(id);
      deleteProduct(id);
    } catch (error) {
      if (estadoPrevio) createProduct(estadoPrevio);
      console.error("Error: ", error);
    }
  };

  const altaPrducto = async (id: number) => {
    const confirm = await Swal.fire({
      title: "¿Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, activar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    try {
      await productService.darAlta(id);
      darAlta(id);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const asignarDescuentoHook = async (
    idProduct: number,
    descuento: IDescuento
  ) => {
    const confirm = await Swal.fire({
      title: "¿Estas seguro que desea asignar descuento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, asignar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    try {
      await productService.asignarDescuento(idProduct, descuento.id);
      asignarDescuento(idProduct, descuento);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const eliminarDescuentoHook = async (idProduct: number) => {
    const confirm = await Swal.fire({
      title: "¿Estas seguro que desea eliminar descuento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    try {
      await productService.eliminarDescuento(idProduct);
      eliminarDescuento(idProduct);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const eliminarImagenHook = async (idProducto: number) => {
    try {
      await imagenService.eliminarImagen(idProducto);
      eliminarImagen(idProducto);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return {
    getProducts,
    createProduct,
    updateProduct,
    deleteProductHook,
    altaPrducto,
    asignarDescuentoHook,
    eliminarDescuentoHook,
    eliminarImagenHook,
  };
};

export default useProduct;
