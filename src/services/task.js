import api from "./api";

export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al obtener tareas" };
  }
};

export const postTask = async ({ titulo, descripcion }) => {
  try {
    const response = await api.post("/tasks", { titulo, descripcion });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al crear tarea" };
  }
};

export const softDeleteTask = async (id, activar = false) => {
  try {
    const response = await api.patch(`/tasks/${id}/trash`, { activa: activar ? true : false });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al actualizar estado de la tarea" };
  }
};

export const getInactiveTasks = async () => {
  try {
    const response = await api.get("/tasks/inactive");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al obtener tareas inactivas" };
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al eliminar" };
  }
};

export const markDone = async (id) => {
  try {
    const response = await api.patch(`/tasks/${id}/done`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al marcar" }
  }
}