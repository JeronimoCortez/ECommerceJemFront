import axios from "axios";
import { IDescuento } from "../types/IDescuento";

const API_URL = import.meta.env.VITE_API_URL;

export class DescuentoService {
  async getDescuentos(): Promise<IDescuento[] | undefined> {
    try {
      const response = await axios.get<IDescuento[]>(`${API_URL}/descuento`);
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async getDescuento(id: number): Promise<IDescuento | undefined> {
    try {
      const response = await axios.get<IDescuento>(
        `${API_URL}/descuento/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async createDescuento(
    descuento: IDescuento
  ): Promise<IDescuento | undefined> {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post<IDescuento>(
        `${API_URL}/descuento`,
        descuento,
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

  async updateDescuento(
    id: number,
    updatedData: IDescuento
  ): Promise<IDescuento | undefined> {
    try {
      const response = await axios.put<IDescuento>(
        `${API_URL}/descuento/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async deleteDescuento(id: number): Promise<IDescuento | undefined> {
    try {
      const response = await axios.delete<IDescuento>(
        `${API_URL}/descuento/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}
