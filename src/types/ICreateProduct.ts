import { TalleDTO } from "./dto/TalleDto";

export interface ICreateProduct {
  nombre: string;
  precio: number;
  idCategoria: number;
  descripcion: string;
  color: string;
  marca: string;
  imagen: string;
  genero: string;
  talles: TalleDTO[];
}
