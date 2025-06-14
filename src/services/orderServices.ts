import axios from "axios";
import { IOrdenCompra } from "../types/IOrdenCompra";

const API_URL = import.meta.env.VITE_API_URL;
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  number: number;
  size: number;
}

export class OrderService {
  private api = axios.create({
    baseURL: `${API_URL}/orden-compra`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  async getOrders(
    page: number = 0,
    size: number = 9
  ): Promise<Page<IOrdenCompra>> {
    try {
      const response = await this.api.get<Page<IOrdenCompra>>("", {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  async getById(id: number): Promise<IOrdenCompra> {
    try {
      const response = await this.api.get<IOrdenCompra>(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      throw error;
    }
  }

  async create(orderData: Omit<IOrdenCompra, "id">): Promise<IOrdenCompra> {
    try {
      const response = await this.api.post<IOrdenCompra>("/", orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  async update(
    id: number,
    orderData: Partial<IOrdenCompra>
  ): Promise<IOrdenCompra> {
    try {
      const response = await this.api.patch<IOrdenCompra>(`/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.error(`Error updating order ${id}:`, error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.api.delete(`/${id}`);
    } catch (error) {
      console.error(`Error deleting order ${id}:`, error);
      throw error;
    }
  }

  async crearPreferenciaMP(
    detalleIds: number[],
    idUsuario: number
  ): Promise<string> {
    try {
      const token = localStorage.getItem("accessToken");
      console.log(detalleIds);
      const response = await axios.post<{ preferenceId: string }>(
        `http://localhost:8080/pay/mp`,
        { id: detalleIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            idUsuario: idUsuario,
          },
        }
      );
      return response.data.preferenceId;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
