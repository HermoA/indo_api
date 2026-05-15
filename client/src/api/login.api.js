import axios from "axios";
import CryptoJS from "crypto-js";

export const createLoginRequest = async (loginData) => {
  try {
    //http://localhost:3000
    //https://api.indoamericalaradio.com/login
    const response = await axios.post("https://api.indoamericalaradio.com/login", loginData, {
      withCredentials: true, // MUY IMPORTANTE para enviar y recibir cookies
    });

    // Puedes guardar el nombre, ID y rol si los necesitas en el frontend
    const { nombre, id, rol } = response.data;
    const now = new Date().getTime();
    console.log(response.data);

    const encrypted = CryptoJS.AES.encrypt(rol, "indo_2578").toString();

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("id", id);
    localStorage.setItem("rol", encrypted);
    localStorage.setItem(`hora actual log`, now);

    return { success: true };
  } catch (error) {
    // Aquí se captura el error y se muestra un mensaje
    console.error("Error en login:", error.response?.data?.message || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "erro al hacer login ",
    };
  }
};
