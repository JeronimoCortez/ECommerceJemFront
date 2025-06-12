import axios from "axios";
import { ICategoria } from "../types/ICategoria";

const API_URL = import.meta.env.VITE_API_URL;

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  number: number;
  size: number;
}

export class CategoriaService {
  async getCategorias(): Promise<ICategoria[] | undefined> {
    try {
      const response = await axios.get<ICategoria[]>(`${API_URL}/categoria`);
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async getCategoriasPage(
    page: number = 0,
    size: number = 9
  ): Promise<Page<ICategoria> | undefined> {
    try {
      const response = await axios.get<Page<ICategoria>>(
        `${API_URL}/categoria`,
        {
          params: { page, size },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorias paginadas:", error);
    }
  }

  async getCategoria(id: number): Promise<ICategoria | undefined> {
    try {
      const response = await axios.get<ICategoria>(
        `${API_URL}/categoria/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async createCategoria(
    categoria: ICategoria
  ): Promise<ICategoria | undefined> {
    try {
      const response = await axios.post<ICategoria>(
        `${API_URL}/categoria`,
        categoria
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async updateCategoria(
    id: number,
    updatedData: ICategoria
  ): Promise<ICategoria | undefined> {
    try {
      const response = await axios.put<ICategoria>(
        `${API_URL}/categoria/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async deleteCategoria(id: number): Promise<ICategoria | undefined> {
    try {
      const response = await axios.delete<ICategoria>(
        `${API_URL}/categoria/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}
