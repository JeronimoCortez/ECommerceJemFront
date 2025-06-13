import IBase from "./IBase";
import { IProduct } from "./IProduct";
import { ITalle } from "./ITalle";

export interface IDetalle extends IBase {
  cantidad: number;
  producto: IProduct;
  talle: string;
}
