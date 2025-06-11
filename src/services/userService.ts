import axios from "axios";
import { IUsuario } from "../types/IUsuario";

const API_URL = import.meta.env.VITE_API_URL;

export class UserService {
  private api = axios.create({
    baseURL: `${API_URL}/usuario`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  async getAll(): Promise<IUsuario[]> {
    try {
      const response = await this.api.get<IUsuario[]>("/");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  async getById(id: number): Promise<IUsuario> {
    try {
      const response = await this.api.get<IUsuario>(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  }

  async create(userData: Omit<IUsuario, "id">): Promise<IUsuario> {
    try {
      const response = await this.api.post<IUsuario>("/", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async update(id: number, userData: Partial<IUsuario>): Promise<IUsuario> {
    try {
      const response = await this.api.patch<IUsuario>(`/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.api.delete(`/${id}`);
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }
}
