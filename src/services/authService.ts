import axios from "axios";
import { ILogin } from "../types/ILogin";
import { IAuthResponse } from "../types/IAuthResponse";
import { IRegister } from "../types/IRegister";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (loginData: ILogin) => {
  try {
    const response = await axios.post<IAuthResponse>(
      `${API_URL}/auth/login`,
      loginData
    );
    if (response.data.token) {
      localStorage.setItem("accessToken", response.data.token);
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const register = async (registerData: IRegister) => {
  try {
    const response = await axios.post<IAuthResponse>(
      `${API_URL}/auth/register`,
      registerData
    );
    if (response.data.token) {
      localStorage.setItem("accessToken", response.data.token);
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error: ", error);
  }
};
