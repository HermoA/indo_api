import api from "./api";

export const getCanciones = async () => {
  const response = await api.get("/canciones");
  return response.data;
};
export const getcacion = async (id) => {
  const response = await api.get(`/cancion/${id}`);
  return response.data;
};
export const createCancionApi = async (cancionData) => {
  const response = await api.post("/cancion", cancionData);
  return response.data;
};
export const updateCancion = async (id, cancionData) => {
  const response = await api.put(`/cancion/${id}`, cancionData);
  return response.data;
};
export const deleteCancion = async (id) => {
  const response = await api.delete(`/cancion/${id}`);
  return response.data;
};
export const searchCanciones = async (query) => {
  const response = await api.get("/canciones/search", { params: { query } });
  return response.data;
}


 

 