import { useState } from "react";
import VerMensajes from "../components/formComponent/VerMensajes";
import MensajesLeidos from "../components/formComponent/VerMesajesLeidos";
import MensajesNoLeidos from "../components/formComponent/VerMensajesNoLeidos";

const PanelMesaje = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div className="p-4">
      {/* Controles de las pestañas */}
      <div className="flex space-x-2 border-b">
        <button
          className={`p-2 ${
            activeTab === "tab1" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Mensajes
        </button>
        <button
          className={`p-2 ${
            activeTab === "tab2" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          Leidos
        </button>
        <button
          className={`p-2 ${
            activeTab === "tab3" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("tab3")}
        >
          No leidos
        </button>
      </div>

      {/* Contenido de las pestañas */}
      <div className="mt-4">
        {activeTab === "tab1" && <VerMensajes />}
        {activeTab === "tab2" && <MensajesLeidos />}
        {activeTab === "tab3" && <MensajesNoLeidos />}
      </div>
    </div>
  );
};

export default PanelMesaje;
