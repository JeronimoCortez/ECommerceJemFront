import axios from "axios";
import { IProduct } from "../types/IProduct";

const API_URL = import.meta.env.VITE_API_URL;

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  number: number;
  size: number;
}

export class ProductService {
  async getProducts(
    page: number = 0,
    size: number = 9
  ): Promise<Page<IProduct> | undefined> {
    try {
      const response = await axios.get<Page<IProduct>>(`${API_URL}/producto`, {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener productos paginados:", error);
    }
  }

  async getNuevos(): Promise<IProduct[] | undefined> {
    try {
      const response = await axios.get<IProduct[]>(
        `${API_URL}/producto/nuevos`
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async getProduct(id: number): Promise<IProduct | undefined> {
    try {
      const response = await axios.get<IProduct>(`${API_URL}/producto/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async createProduct(product: IProduct): Promise<IProduct | undefined> {
    try {
      const response = await axios.post<IProduct>(
        `${API_URL}/producto`,
        product
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async updateProduct(
    id: number,
    updatedData: IProduct
  ): Promise<IProduct | undefined> {
    try {
      const response = await axios.put<IProduct>(
        `${API_URL}/producto/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async deleteProduct(id: number): Promise<IProduct | undefined> {
    try {
      const response = await axios.delete<IProduct>(
        `${API_URL}/producto/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}
