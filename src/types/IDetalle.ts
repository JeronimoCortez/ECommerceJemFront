import IBase from "./IBase";
import { IProduct } from "./IProduct";

export interface IDetalle extends IBase {
  cantidad: number;
  producto: IProduct;
}
