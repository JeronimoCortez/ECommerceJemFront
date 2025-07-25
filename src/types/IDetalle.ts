import IBase from "./IBase";
import { IProduct } from "./IProduct";
import { ITalle } from "./ITalle";

export interface IDetalle {
  id?: number;
  activo?: boolean;
  cantidad: number;
  producto: IProduct;
  talle: string;
}
