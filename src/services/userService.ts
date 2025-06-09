import axios from "axios";
import { IUsuario } from "../types/IUsuario";

const API_URL = import.meta.env.VITE_API_URL;

export const getUser = async (id: number) => {
  try {
    const response = await axios.get<IUsuario>(`${API_URL}/usuario/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get<IUsuario[]>(`${API_URL}/usuario`);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
  }
};