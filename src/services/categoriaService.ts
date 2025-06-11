import axios from "axios";
import { ICategoria } from "../types/ICategoria";

const API_URL = import.meta.env.BASE_URL;

export class CategoriaService {
  async getCategorias(): Promise<ICategoria[] | undefined> {
    try{
      const response = await axios.get<ICategoria[]>(`${API_URL}/categoria`);
      return response.data;
    } catch (error){
      console.error("Error: ", error);
    }
  }

  async getCategoria(id: number): Promise<ICategoria | undefined> {
    try {
      const response = await axios.get<ICategoria>(`${API_URL}/categoria/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async createCategoria(categoria: ICategoria): Promise<ICategoria | undefined> {
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