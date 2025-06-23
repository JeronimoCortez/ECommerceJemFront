import { useShallow } from "zustand/shallow";
import { DetalleStore } from "../store/detalleStore";
import { IDetalle } from "../types/IDetalle";
import { DetalleService } from "../services/detalleService";
import { ICreateDetalle } from "../types/ICreateDetalle";

const detalleService = new DetalleService();

export const useDetalle = () => {
  const { detalles, setArrayDetalles } = DetalleStore(
    useShallow((state) => ({
      detalles: state.detalles,
      setArrayDetalles: state.setArrayDetalles,
    }))
  );

  const createDetalles = async (detallesArray: IDetalle[]) => {
    try {
      const detallesCreados: IDetalle[] = await Promise.all(
        detallesArray.map((detalle) => {
          if (!detalle.producto?.id) {
            throw new Error("Falta el id del producto en uno de los detalles");
          }

          const createDetalle: ICreateDetalle = {
            cantidad: detalle.cantidad,
            idProducto: detalle.producto.id,
            talle: detalle.talle,
          };

          return detalleService.createDetalle(createDetalle);
        })
      );
      setArrayDetalles(detallesCreados);
    } catch (error) {
      console.error("Error creando detalles:", error);
    }
  };

  return {
    detalles,
    createDetalles,
  };
};
