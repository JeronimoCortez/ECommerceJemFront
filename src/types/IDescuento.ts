import IBase from "./IBase";

export interface IDescuento extends IBase {
  fechaInicio: Date;
  fechaLimite: Date;
  descuento: number;
}
