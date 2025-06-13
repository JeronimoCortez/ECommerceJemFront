import { Estado } from "./enums/Estado.enum";
import IBase from "./IBase";
import { IDetalle } from "./IDetalle";
import { IUsuario } from "./IUsuario";

export interface IOrdenCompra extends IBase {
  usuario?: IUsuario;
  detalles?: IDetalle[];
  fecha: Date;
  precioTotal: number;
  estado: Estado;
}
