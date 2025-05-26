import IBase from "./IBase";
import { IProduct } from "./IProduct";
import { ITipo } from "./ITipo";

export interface ICategoria extends IBase {
  nombre: String;
  tipo: ITipo;
  productos: IProduct[];
}
