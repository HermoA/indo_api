import api from "./api";

export const getRanking = async () => {
  const response = await api.get("/ranking");
  return response.data;
};
export const getRankingNombre = async () => {
  const response = await api.get("/rankin/nombre");
  return response.data;
};
export const getRankingCanciones = async () => {
  const response = await api.get("/rankin/canciones");
  return response.data;
};
export const createRanking = async (data) => {
  const response = await api.post("/ranking", data);
  return response.data;
};
export const updateRanking = async (id, data) => {
  const response = await api.put(`/ranking/${id}`, data);
  return response.data;
};
export const deleteRanking = async (id) => {
  const response = await api.delete(`/ranking/${id}`);
  return response.data;
};
export const voto = async (data) => {
  const response = await api.post("/voto", data);
  return response.data;
};
export const delVoto = async (id) => {
  const response = await api.delete(`/voto/${id}`);
  return response.data;
};
export const getCancionesSinRanking = async () => {
  const response = await api.get("/canciones/sin-ranking");
  return response.data;
};
export const editCancion = async (id, data) => {
  const response = await api.put(`/cancion/${id}`, data);
  return response.data;
};
