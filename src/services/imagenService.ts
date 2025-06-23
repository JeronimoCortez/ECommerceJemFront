import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export class ImagenService {
  async uploadImage(file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("accessToken");

      const response = await axios.patch(`${API_URL}/upload/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async eliminarImagen(idProducto: number) {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.patch(
        `${API_URL}/upload/eliminarImagen/${idProducto}`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
