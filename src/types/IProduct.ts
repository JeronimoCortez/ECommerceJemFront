import IBase from "./IBase";
import { ICategoria } from "./ICategoria";
import { IDescuento } from "./IDescuento";
import { ITalle } from "./ITalle";
import { Genero } from "../types/enums/Genero.enum"

export interface IProduct extends IBase {
  nombre: string;
  precio: number;
  categoria: ICategoria;
  descripcion: string;
  talles: ITalle[];
  stock: number;
  imagen: File | null;
  color: string;
  marca: string;
  genero: string;
  descuentos: IDescuento[];
  genero: Genero;
}
