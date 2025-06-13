import { TalleDTO } from "./dto/TalleDTO";
import { Genero } from "./enums/Genero.enum";
import { ITalle } from "./ITalle";

export interface ICreateProduct {
  nombre: string;
  precio: number;
  idCategoria: number;
  descripcion: string;
  color: string;
  marca: string;
  imagen: string | File | null;
  genero: Genero | null;
  talles: TalleDTO[] | ITalle[];
}
