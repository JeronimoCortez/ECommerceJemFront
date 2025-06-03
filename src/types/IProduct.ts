import IBase from "./IBase";
import { ICategoria } from "./ICategoria";
import { IDescuento } from "./IDescuento";
import { ITalle } from "./ITalle";

export interface IProduct extends IBase {
  nombre: string;
  precio: number;
  categorias: ICategoria[];
  descripcion: string;
  talles: ITalle[];
  stock: number;
  imagenJPG: File | null;
  color: string;
  marca: string;
  descuentos: IDescuento[];
}
