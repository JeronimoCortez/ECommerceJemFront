import axios from "axios";
import { IOrdenCompra } from "../types/IOrdenCompra";

const API_URL = import.meta.env.VITE_API_URL;

export class OrderService {
  private api = axios.create({
    baseURL: `${API_URL}/api/orders`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  async getAll(): Promise<IOrdenCompra[]> {
    try {
      const response = await this.api.get<IOrdenCompra[]>("/");
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
}