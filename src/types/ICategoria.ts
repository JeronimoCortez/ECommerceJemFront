import IBase from "./IBase";
import { IProduct } from "./IProduct";
import { ITipo } from "./ITipo";

export interface ICategoria extends IBase {
  nombre: string;
  tipo: ITipo;
  productos: IProduct[];
}
