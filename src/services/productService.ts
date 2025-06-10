import axios from "axios";
import { IProduct } from "../types/IProduct";

const API_URL = import.meta.env.BASE_URL;
export class ProductService {
  async getProducts(): Promise<IProduct[] | undefined> {
    try {
      const response = await axios.get<IProduct[]>(`${API_URL}/producto`);
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
