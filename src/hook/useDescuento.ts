import { DescuentoService } from "../services/descuentoService";
import { descuentoStore } from "../store/descuentoStore";
import { useShallow } from "zustand/shallow";
import { IDescuento } from "../types/IDescuento";
import Swal from "sweetalert2";

const descuentoService = new DescuentoService();

const useDescuento = () => {
  const {
    descuentos,
    setDescuentos,
    addDescuento,
    deleteDescuento,
    editDescuento,
  } = descuentoStore(
    useShallow((state) => ({
      descuentos: state.descuentos,
      setDescuentos: state.setDescuentos,
      addDescuento: state.addDescuento,
      editDescuento: state.editDescuento,
      deleteDescuento: state.deleteDescuento,
    }))
  );

  const getDescuentos = async () => {
    const data = await descuentoService.getDescuentos();
    if (data) setDescuentos(data);
  };

  const createDescuento = async (newDescuento: IDescuento) => {
    try {
      addDescuento(newDescuento);
    } catch (error) {
      deleteDescuento(newDescuento.id);
      console.error("Error: ", error);
    }
  };

  const updateDescuento = async (id: number, descuentoUpdate: IDescuento) => {
    const estadoPrevio = descuentos.find((p) => p.id === descuentoUpdate.id);
    try {
      await descuentoService.updateDescuento(id, descuentoUpdate);
      editDescuento(descuentoUpdate);
      Swal.fire("Éxito", "Sprint actualizado correctamente", "success");
    } catch (error) {
      if (estadoPrevio) {
        editDescuento(estadoPrevio);
      }
      console.error("Error: ", error);
    }
  };

  const deleteDescuentoHook = async (id: number) => {
    const estadoPrevio = descuentos.find((p) => p.id === id);
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
      await descuentoService.deleteDescuento(id), deleteDescuento(id);
    } catch (error) {
      if (estadoPrevio) createDescuento(estadoPrevio);
      console.error("Error: ", error);
    }
  };

  return {
    getDescuentos,
    createDescuento,
    updateDescuento,
    addDescuento,
    deleteDescuentoHook,
  };
};

export default useDescuento;
