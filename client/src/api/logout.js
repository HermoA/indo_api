import axios from "axios";


export const logout = async () => {
  await axios.post(
    "https://api.indoamericalaradio.com/logout",
    {},
    { withCredentials: true }
  );

  localStorage.removeItem("nombre");
  localStorage.removeItem("id");
  localStorage.removeItem("rol");
  window.location.href = "/";
};
