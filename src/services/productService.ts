import axios from "axios";
import { IProduct } from "../types/IProduct";
import { ICreateProduct } from "../types/ICreateProduct";

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

  async createProduct(product: ICreateProduct): Promise<IProduct | undefined> {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post<IProduct>(
        `${API_URL}/producto/create`,
        product,
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

  async updateProduct(updatedData: IProduct): Promise<IProduct | undefined> {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put<IProduct>(
        `${API_URL}/producto`,
        updatedData,
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

  async deleteProduct(id: number): Promise<IProduct | undefined> {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.delete<IProduct>(
        `${API_URL}/producto/${id}`,
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

  async darAlta(id: number): Promise<IProduct | undefined> {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.patch<IProduct>(
        `${API_URL}/producto/${id}`,
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

  async asignarDescuento(
    idProducto: number,
    idDiscount: number
  ): Promise<IProduct | undefined> {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.patch<IProduct>(
        `${API_URL}/producto/${idProducto}/addDiscount/${idDiscount}`,
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
