import api from "./api";

export const createUser = async (userdata) => {
  try {
    const response = await api.post("/usuario", userdata);
    console.log(response.data);

    return { success: true };
  } catch (error) {
    console.error(
      "error al crear:",
      error.response?.data?.message || error.message
    );

    return {
      success: false,
      message: error.response?.data?.message || "erro al hacer login ",
    };
  }
};
export const updateUser = async (id, userdata) => {
  const response = await api.put(`/usuario/${id}`, userdata);
  return response.data;
};
export const updaterol = async (id, rol) => {
  const response = await api.put(`/usuario/${id}/rol`, rol);
  console.log("rol desde api"+ rol);
  
  return response.data;
};
export const verUsuarios = async () => {
  const response = await api.get("/usuarios");
  return response.data;
};
export const verUser = async (id) => {
  const response = await api.get(`/usuario/${id}`);
  return response.data;
};
export const deleteUser = async (id) => {
  const response = await api.delete(`/usuario/${id}`);
  return response.data;
};
