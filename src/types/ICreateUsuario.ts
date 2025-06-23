import { Role } from "./enums/Role.enum";

export interface ICreateUsuario {
  nombreCompleto: string;
  email: string;
  contrasenia: string;
  rol: Role;
  dni: string;
  phone: string;
}
