import IBase from "./IBase";

export interface IDescuento extends IBase {
  descuento: number;
  fechaInicio: string;
  fechaLimite: string;
}