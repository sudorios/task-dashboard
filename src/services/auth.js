import api from "./api";

export const loginService = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error en el login" };
  }
};

export const registerService = async (email, password) => {
    try {
        const response = await api.post("/auth/register", {
            email,
            password,
        });
        return response.data;        
    } catch (error) {
        throw error.response?.data || {message: "Error en el register"}
    }
}