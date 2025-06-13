import axios from "axios";
import { IUsuario } from "../types/IUsuario";

const API_URL = import.meta.env.VITE_API_URL;

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  number: number;
  size: number;
}

export class UserService {
  private api = axios.create({
    baseURL: `${API_URL}/usuario`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  async getUsers(page: number = 0, size: number): Promise<Page<IUsuario>> {
    try {
      const response = await this.api.get<Page<IUsuario>>("", {
        params: { page, size },
      });
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
    const token = localStorage.getItem("accessToken");
    try {
      await this.api.delete(`/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }
  async darAlta(id: number): Promise<IUsuario | undefined> {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.patch<IUsuario>(
        `${API_URL}/usuario/${id}`,
        {},
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
}
