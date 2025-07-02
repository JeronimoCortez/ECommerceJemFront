import { useShallow } from "zustand/shallow";
import { DireccionService } from "../services/direccionService";
import { direccionStore } from "../store/direccionStore";
import { IDireccion } from "../types/IDireccion";
import Swal from "sweetalert2";

const direccionService = new DireccionService();

const useDireccion = () => {
  const {
    direcciones,
    setDirecciones,
    addDireccion,
    deleteDireccion,
    editDireccion,
  } = direccionStore(
    useShallow((state) => ({
      direcciones: state.direcciones,
      setDirecciones: state.setDirecciones,
      addDireccion: state.addDireccion,
      editDireccion: state.editDireccion,
      deleteDireccion: state.deleteDireccion,
    }))
  );

  const getDirecciones = async () => {
    const data = await direccionService.getDirecciones();
    if (data) setDirecciones(data);
  };

  const createDireccion = async (newDireccion: IDireccion) => {
    try {
      await direccionService.createDireccion(newDireccion);
      addDireccion(newDireccion);
      Swal.fire("Éxito", "Direccion creada correctamente", "success");
    } catch (error) {
      deleteDireccion(newDireccion.id);
      console.error("Error: ", error);
    }
  };
  const updateDireccion = async (id: number, direccionUpdate: IDireccion) => {
    const estadoPrevio = direcciones.find((p) => p.id === direccionUpdate.id);
    try {
      await direccionService.updateDireccion(id, direccionUpdate);
      editDireccion(direccionUpdate);
      Swal.fire("Éxito", "Direccion actualizada correctamente", "success");
    } catch (error) {
      if (estadoPrevio) {
        editDireccion(estadoPrevio);
      }
      console.error("Error: ", error);
    }
  };

  const deleteDireccionHook = async (id: number) => {
    const estadoPrevio = direcciones.find((p) => p.id === id);
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
      await direccionService.deleteDireccion(id), deleteDireccion(id);
    } catch (error) {
      if (estadoPrevio) createDireccion(estadoPrevio);
      console.error("Error: ", error);
    }
  };

  return {
    getDirecciones,
    createDireccion,
    updateDireccion,
    deleteDireccionHook,
  };
};

export default useDireccion;
