import axios from "axios";
import { IDetalle } from "../types/IDetalle";

const API_URL = import.meta.env.VITE_API_URL;

export class DetalleService {
  async createDetalle(detalle: IDetalle) {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post<IDetalle>(
        `${API_URL}/detalle`,
        detalle,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {}
  }
}
