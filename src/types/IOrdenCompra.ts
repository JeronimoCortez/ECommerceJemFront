import { Estado } from "./enums/Estado.enum";
import IBase from "./IBase";
import { IDetalle } from "./IDetalle";
import { IDireccion } from "./IDireccion";

export interface IOrdenCompra extends IBase {
  direccionUsuario: IDireccion;
  detalles: IDetalle[];
  fecha: Date;
  precioTotal: number;
  metodoPago: string;
  estado: Estado;
}
