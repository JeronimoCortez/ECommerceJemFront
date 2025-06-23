import axios from "axios";
import { IDetalle } from "../types/IDetalle";
import { ICreateDetalle } from "../types/ICreateDetalle";

const API_URL = import.meta.env.VITE_API_URL;

export class DetalleService {
  async createDetalle(detalle: ICreateDetalle) {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post<IDetalle>(
        `${API_URL}/detalle/create`,
        detalle,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error al crear detalle:", error);
      throw error;
    }
  }
}
