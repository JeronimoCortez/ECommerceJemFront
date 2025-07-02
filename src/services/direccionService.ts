import axios from "axios";
import { IDireccion } from "../types/IDireccion";
import { ICreateDireccion } from "../types/ICreateDireccion";

const API_URL = import.meta.env.VITE_API_URL;

export class DireccionService {
  async getDirecciones(): Promise<IDireccion[] | undefined> {
    try {
      const response = await axios.get<IDireccion[]>(`${API_URL}/direccion`);
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async getDireccion(id: number): Promise<IDireccion | undefined> {
    try {
      const response = await axios.get<IDireccion>(
        `${API_URL}/direccion/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async createDireccion(
    direccion: ICreateDireccion
  ): Promise<IDireccion | undefined> {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post<IDireccion>(
        `${API_URL}/direccion`,
        direccion,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async updateDireccion(
    updatedData: IDireccion
  ): Promise<IDireccion | undefined> {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.put<IDireccion>(
        `${API_URL}/direccion`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
