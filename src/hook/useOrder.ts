import { OrderService } from "../services/orderServices";
import { orderStore } from "../store/orderStore";
import { useShallow } from "zustand/shallow";
import { IOrdenCompra } from "../types/IOrdenCompra";
import Swal from "sweetalert2";
import { Estado } from "../types/enums/Estado.enum";

const orderService = new OrderService();

const useOrder = () => {
  const {
    orders,
    orderActive,
    setOrders,
    setOrderActive,
    addOrder,
    editOrder,
    deleteOrder,
    altaOrder,
    modificarEstado,
  } = orderStore(
    useShallow((state) => ({
      orders: state.orders,
      orderActive: state.orderActive,
      setOrders: state.setOrders,
      setOrderActive: state.setOrderActive,
      addOrder: state.addOrder,
      editOrder: state.editOrder,
      deleteOrder: state.deleteOrder,
      altaOrder: state.altaOrder,
      modificarEstado: state.modificarEstado,
    }))
  );

  const getOrders = async (page: number, size: number = 9) => {
    try {
      const data = await orderService.getOrders(page, size);
      if (data) {
        setOrders((prev: IOrdenCompra[]) => {
          const newOrders = data.content.filter(
            (np) => !prev.some((pp) => pp.id === np.id)
          );
          return [...prev, ...newOrders];
        });
      }
      return data;
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      Swal.fire("Error", "No se pudieron obtener las órdenes", "error");
      throw error;
    }
  };

  const getOrderById = async (id: number) => {
    try {
      const data = await orderService.getById(id);
      if (data) setOrderActive(data);
      return data;
    } catch (error) {
      console.error(`Error al obtener orden ${id}:`, error);
      Swal.fire("Error", `No se pudo obtener la orden ${id}`, "error");
      throw error;
    }
  };

  const createOrder = async (newOrder: Omit<IOrdenCompra, "id">) => {
    try {
      const createdOrder = await orderService.create(newOrder);
      if (createdOrder) {
        addOrder(createdOrder);
        Swal.fire("Éxito", "Orden creada correctamente", "success");
        return createdOrder;
      }
    } catch (error) {
      console.error("Error al crear orden:", error);
      Swal.fire("Error", "No se pudo crear la orden", "error");
      throw error;
    }
  };

  const updateOrder = async (
    id: number,
    orderUpdate: Partial<IOrdenCompra>
  ) => {
    const previousState = orders.find((o) => o.id === id);
    try {
      const updatedOrder = await orderService.update(id, orderUpdate);
      if (updatedOrder) {
        editOrder(updatedOrder);
        if (orderActive?.id === id) setOrderActive(updatedOrder);
        Swal.fire("Éxito", "Orden actualizada correctamente", "success");
        return updatedOrder;
      }
    } catch (error) {
      if (previousState) editOrder(previousState);
      console.error("Error al actualizar orden:", error);
      Swal.fire("Error", "No se pudo actualizar la orden", "error");
      throw error;
    }
  };

  const deleteOrderById = async (id: number) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!confirm.isConfirmed) return false;

    try {
      await orderService.delete(id);
      deleteOrder(id);
      Swal.fire("Eliminada", "La orden ha sido eliminada", "success");
      return true;
    } catch (error) {
      console.error("Error al eliminar orden:", error);
      Swal.fire("Error", "No se pudo eliminar la orden", "error");
      return false;
    }
  };

  const altaOrderHook = async (id: number) => {
    const confirm = await Swal.fire({
      title: "¿Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, activar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    try {
      await orderService.alta(id);
      altaOrder(id);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const modificarEstadoHook = async (id: number, estado: Estado) => {
    try {
      await orderService.modificarEstado(id, estado);
      modificarEstado(id, estado);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return {
    orders,
    orderActive,
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrderById,
    modificarEstadoHook,
    setOrderActive,
    altaOrderHook,
  };
};

export default useOrder;
