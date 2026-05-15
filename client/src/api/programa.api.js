import api from "./api";

export const verProgramas = async () => {
  const response = await api.get("/programas");
  return response.data;
};
export const verProgramasDias = async () => {
  const response = await api.get("/programadias");
  return response.data;
};

export const verPrograma = async (id) => {
  const response = await api.get(`/programa/${id}`);
  return response.data;
};
export const verActual = async () => {
  const response = await api.get(`/actual`);
  return response.data;
};

export const createProgramaApi = async (programaData, file) => {
  const formData = new FormData();

  // Agregar archivo (asegúrate de que tu backend lo reciba como req.file)
  formData.append("image", file);

  // Agregar los datos del programa como campos individuales
  for (const key in programaData) {
    formData.append(key, programaData[key]);
  }
  const response = await api.post("/programa", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
export const updatePrograma = async (id, programaData) => {
  const response = await api.put(`/programa/${id}`, programaData);
  return response.data;
};

export const deletePrograma = async (id) => {
  const response = await api.delete(`/programa/${id}`);
  return response.data;
};
export const uploadImagePrograma = async (id, file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await api.put(`/programa/uploadimage/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const deleteImagePrograma = async (id) => {
  const response = await api.put(`/programa/deleteimage/${id}`);
  return response.data;
};
