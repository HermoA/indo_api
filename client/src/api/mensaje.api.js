import api from "./api";

export const getMensajes = async () => {
  const response = await api.get("/mensajes");
  return response.data;
};

export const getMensajesById = async (id) => {
  const response = await api.get(`/mensaje/${id}`);
  return response.data;
};
export const getMensajeLeido = async () => {
  const response = await api.get("/mensajes/leidos");
  return response.data;
};
export const getMensajeNoLeido = async () => {
  const response = await api.get("/mensajes/noleidos");
  return response.data;
};

export const createMensaje = async (mensajeData) => {
  const response = await api.post("/mensaje", mensajeData);
  return response.data;
};
export const deleteMensaje = async (id) => {
  const response = await api.delete(`/mensaje/${id}`);
  return response.data;
};
export const mensajeLeido = async (id) => {
  const response = await api.put(`/mensaje/${id}`);
  return response.data;
};

