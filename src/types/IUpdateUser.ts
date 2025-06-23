import { Role } from "./enums/Role.enum";

export interface IUpdateUser {
  nombreCompleto: string;
  email: string;
  rol: Role;
  dni: string;
  phone: string;
}
