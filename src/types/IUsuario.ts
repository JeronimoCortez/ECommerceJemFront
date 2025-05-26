import { Role } from "./enums/Role.enum";
import IBase from "./IBase";
import { IDireccion } from "./IDireccion";

export interface IUsuario extends IBase {
  userName: string;
  email: string;
  contraseña: string;
  rol: Role;
  dni: string;
  phone: string;
  direcciones: IDireccion[];
}
