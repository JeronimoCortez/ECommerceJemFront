import axios from "axios";
import { ICategoria } from "../types/ICategoria";

const API_URL = import.meta.env.VITE_API_URL;

export const getCategoria = async (id: number) => {
  try {
    const response = await axios.get<ICategoria>(`${API_URL}/categoria/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categoría: ", error);
  }
};

export const getCategorias = async () => {
  try {
    const response = await axios.get<ICategoria[]>(`${API_URL}/categoria`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías: ", error);
  }
};

export const createCategoria = async (categoria: ICategoria) => {
  try {
    const response = await axios.post<ICategoria>(`${API_URL}/categoria`, categoria);
    return response.data;
  } catch (error) {
    console.error("Error al crear categoría: ", error);
  }
};

export const updateCategoria = async (id: number, data: Partial<ICategoria>) => {
  try {
    const response = await axios.put<ICategoria>(`${API_URL}/categoria/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar categoría: ", error);
  }
};

export const deleteCategoria = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/categoria/${id}`);
    return response.status === 200;
  } catch (error) {
    console.error("Error al eliminar categoría: ", error);
    return false;
  }
};
