import { Role } from "./enums/Role.enum";
import IBase from "./IBase";
import { IDireccion } from "./IDireccion";
import { IOrdenCompra } from "./IOrdenCompra";

export interface IUsuario extends IBase {
  nombreCompleto: string;
  email: string;
  rol: Role;
  dni: string;
  phone: string;
  direcciones: IDireccion[];
  ordenes: IOrdenCompra[];
}
