import { IProduct } from "./IProduct";

export interface ICreateDetalle {
  cantidad: number;
  producto: IProduct;
  talle: string;
}
