import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Reproductor from "../components/reproductor/ReproResposive";
import Presentacion from "../components/PresentacionComponent";
import VerProgramas from "../components/programas/VerProgramas";
import Toprank from "../components/ranking/CancionRanking";
import Principales from "../components/noticias/Principales";
import PresentacionApp from "../components/presnetacionApp/PresentacionApp";
import LogoLoader from "../components/LoaderLogo";

function Homepage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (document.readyState === "complete") {
      // Si la página ya terminó de cargar antes de montar el listener
      setLoading(false);
    } else {
      const handleLoad = () => setLoading(false);
      window.addEventListener("load", handleLoad);

      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Tu lógica de expiración del login
  useEffect(() => {
    const MILISEGUNDOS_EN_24_HORAS = 2 * 24 * 60 * 60 * 1000;
    const horaGuardada = localStorage.getItem("hora actual log");

    if (horaGuardada) {
      const ahora = new Date().getTime();
      const diferencia = ahora - parseInt(horaGuardada, 10);

      if (diferencia > MILISEGUNDOS_EN_24_HORAS) {
        localStorage.removeItem("nombre");
        localStorage.removeItem("id");
        localStorage.removeItem("rol");
        localStorage.removeItem("hora actual log");
      }
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-950 relative">
      {/* Contenido de tu página */}
      <div className="2xl:h-44 h-32 hidden lg:block bg-black"></div>
      <Presentacion />
      <Reproductor />
      <Toprank />
      <Principales />
      <VerProgramas />
      <PresentacionApp />
      <Footer />

      {/* Overlay de loading */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <LogoLoader />
          <p className="text-white text-lg font-semibold animate-pulse mt-4">
            Cargando...
          </p>
        </div>
      )}
    </div>
  );
}

{
  /*logo cargando* https://creator.lottiefiles.com/?remixId=197cdf18-d5e4-4364-b47c-00ce42f4b732&utm_source=&utm_medium=creator */
}

export default Homepage;
