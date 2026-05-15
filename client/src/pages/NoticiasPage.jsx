import { useEffect, useState } from "react";
import Inicio from "../components/noticias/NoticiaInicio";
import Footer from "../components/Footer";
import Categorias from "../components/noticias/Categorias";

const NoticiasPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const tabs = [
    { id: "tab1", label: "GLOBAL" },
    { id: "tab2", label: "LOCAL" },
    { id: "tab3", label: "NACIONAL" },
    { id: "tab4", label: "MUNDO" },
    { id: "tab5", label: "ENTRETENIMIENTO" },
    { id: "tab6", label: "DEPORTES" },
    { id: "tab7", label: "CULTURA" },
    { id: "tab8", label: "MUSICA" },
    { id: "tab9", label: "ESPECTACULOS" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 80) {
        // Scroll hacia abajo
        setVisible(false);
      } else {
        // Scroll hacia arriba
        setVisible(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div className="pt-16 sm:pt-24">
      {/* Tabs con animación */}
      <div
        className={`fixed top-0 pt-12 sm:pt-24 left-0 w-full z-40 transition-transform duration-300 ease-in-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        } bg-black text-white font-bold`}
      >
        <div className="flex overflow-x-auto justify-center scrollbar-thin scrollbar-thumb-gray-400 px-4 py-4 gap-4 sm:gap-6 text-sm sm:text-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-w-fit whitespace-nowrap px-3 py-1 transition-colors duration-200 ${
                activeTab === tab.id
                  ? "text-indo_green border-b-2 border-indo_green"
                  : "hover:text-indo_green"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido de pestañas */}
      <div className="mt-20 px-4 sm:px-10">
        {activeTab === "tab1" && <Inicio />}
        {activeTab === "tab2" && <Categorias tipo="Local" />}
        {activeTab === "tab3" && <Categorias tipo="Nacional" />}
        {activeTab === "tab4" && <Categorias tipo="Mundo" />}
        {activeTab === "tab5" && <Categorias tipo="Entretenimiento" />}
        {activeTab === "tab6" && <Categorias tipo="Deportes" />}
        {activeTab === "tab7" && <Categorias tipo="Cultura" />}
        {activeTab === "tab8" && <Categorias tipo="Musica" />}
        {activeTab === "tab9" && <Categorias tipo="Espectaculos" />}
      </div>

      <div className="mt-4">
        <Footer />
      </div>
    </div>
  );
};

export default NoticiasPage;
