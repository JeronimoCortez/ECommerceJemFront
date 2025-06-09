import IBase from "./IBase";

export interface IDireccion extends IBase {
  calle: String;
  localidad: String;
  cp: String;
}