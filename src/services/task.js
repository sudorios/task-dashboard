import api from "./api";

export const getTasks = async () => {
  try {
    const response = await api.get("/tasks"); 
    return response.data; 
  } catch (error) {
    throw error.response?.data || { message: "Error al obtener tareas" };
  }
};
