import { IDireccion } from "./IDireccion";

export type IEditProfileUser = {
  email: string;
  nombre: string;
  dni: string;
  phone: string;
  direccion?: IDireccion;
};
