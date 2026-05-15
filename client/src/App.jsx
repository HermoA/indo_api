import "./App.css";
import Navbar from "./components/navbar/NavbarComponent.jsx";
import Menu from "./components/navbar/MenuResponsive.jsx";
//import Menu from "./components/Menu";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Contacto from "./pages/ContactoPage.jsx";
import Ranking from "./pages/RankingPage.jsx";
import NotfoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegisterPage";
import PanelPage from "./pages/PanelPage";
import EditUser from "./pages/EdituserPage";
import NoticiasPage from "./pages/NoticiasPage.jsx";
import Noticia from "./pages/NoticiaPage.jsx";
import Programas from "./components/programas/Programas.jsx";
import Usuario from "./pages/UsuarioPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./api/api.js";
import Reproductor from "./components/reproductor/ReproductorPrincipal.jsx";
import CryptoJS from "crypto-js";

function App() {
  const encrypted = localStorage.getItem("rol");

  let rol = null;

  if (encrypted) {
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, "indo_2578");
      rol = bytes.toString(CryptoJS.enc.Utf8);

      // Si no se pudo decodificar bien
      if (!rol) {
        console.warn("La desencriptación no devolvió un valor válido.");
      }
    } catch (error) {
      console.error("Error desencriptando el rol:", error);
    }
  } else {
    console.warn("No se encontró el valor 'rol' en localStorage.");
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/test" element={<Usuario />} />
        <Route path="/noticias" element={<NoticiasPage />} />
        <Route path="/programas" element={<Programas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/noticia/:id/:titulo" element={<Noticia />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route
          path={rol === "admin" || rol === "editor" ? "/panel" : "/"}
          element={<PanelPage />}
        />
        <Route
          path={rol === "admin" || rol === "editor" ? "/edituser" : "/"}
          element={<EditUser />}
        />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
      <Reproductor />
    </BrowserRouter>
  );
}

export default App;
