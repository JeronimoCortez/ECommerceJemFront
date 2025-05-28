import axios from "axios";
import { ILogin } from "../types/ILogin";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (loginData: ILogin) => {
  try {
    console.log(`${API_URL}/auth/login`);
    const response = await axios.post(`${API_URL}/auth/login`, loginData);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
  }
};
