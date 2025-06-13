import axios from "axios";
import { ITipo } from "../types/ITipo";

const API_URL = import.meta.env.VITE_API_URL;

export class TipoService {
  async createTipo(tipo: ITipo): Promise<ITipo | undefined> {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post<ITipo>(`${API_URL}/tipo`, tipo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creando tipo:", error);
      return undefined;
    }
  }
}
