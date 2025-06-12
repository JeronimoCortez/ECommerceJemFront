import IBase from "./IBase";

export interface IDireccion extends IBase {
  calle: string;
  localidad: string;
  cp: string;
}
