import api from "./api";

export const getNoticias = async () => {
  const response = await api.get("/noticias");
  return response.data;
};

export const verNoticia = async (id) => {
  const response = await api.get(`/noticia/${id}`);
  return response.data;
};
export const verCategoria = async (categotia) => {
  const response = await api.get(`/noticias/${categotia}`);
  return response.data;
};

export const createNoticiaApi = async (noticiaData, file) => {
  const formData = new FormData();

  // Agregar archivo (asegúrate de que tu backend lo reciba como req.file)
  formData.append("img", file);

  // Agregar los datos del programa como campos individuales
  for (const key in noticiaData) {
    formData.append(key, noticiaData[key]);
  }
  const response = await api.post("/noticia", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
export const updateNoticia = async (id, noticiaData) => {
  const response = await api.put(`/noticia/${id}`, noticiaData);
  return response.data;
};

export const deleteNoticia = async (id) => {
  const response = await api.delete(`/noticia/${id}`);
  return response.data;
};
export const deleteImgNoticia = async (id) => {
  const response = await api.delete(`/noticia/img/${id}`);
  return response.data;
};

export const updateImgNoticiaApi = async (id, file) => {
  const formData = new FormData();

  // Agregar archivo (asegúrate de que tu backend lo reciba como req.file)
  formData.append("img", file);

  console.log(formData.get("img"));

  const response = await api.put(`/noticia/img/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
