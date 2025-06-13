import axios from "axios";
import { IDireccion } from "../types/IDireccion";

const API_URL = import.meta.env.BASE_URL;

export class DireccionService {
  async getDirecciones(): Promise<IDireccion[] | undefined> {
    try{
      const response = await axios.get<IDireccion[]>(`${API_URL}/direccion`);
      return response.data;
    } catch (error){
      console.error("Error: ", error);
    }
  }

  async getDireccion(id: number): Promise<IDireccion | undefined> {
    try {
      const response = await axios.get<IDireccion>(`${API_URL}/direccion/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async createDireccion(direccion: IDireccion): Promise<IDireccion | undefined> {
    try {
      const response = await axios.post<IDireccion>(
        `${API_URL}/direccion`,
        direccion
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async updateDireccion(
    id: number,
    updatedData: IDireccion
  ): Promise<IDireccion | undefined> {
    try {
      const response = await axios.put<IDireccion>(
        `${API_URL}/direccion/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async deleteDireccion(id: number): Promise<IDireccion | undefined> {
    try {
      const response = await axios.delete<IDireccion>(
        `${API_URL}/direccion/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}