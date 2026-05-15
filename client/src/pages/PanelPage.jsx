//import Logo from "../assets/logo_i_nega.svg";
import { FaRegUser } from "react-icons/fa";
import { FaRadio } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { IoMdMusicalNote } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import PanelUsuario from "../components/PanelUsuario";
import { useState } from "react";
import PanleProgramas from "../components/PanelProgramas";
import PanelNoticia from "../components/PanelNoticia";
import PanelRanking from "../components/PanelRanking";
import PanelCanciones from "../components/PanelCanciones";
import PanleMensaje from "../components/PanelMesaje";
import CryptoJS from "crypto-js";
import { motion, AnimatePresence } from "framer-motion";

const PanelPage = () => {
  const [activeTab, setActiveTab] = useState("tab3");
  const encrypted = localStorage.getItem("rol");

  let rol = null;
  if (encrypted) {
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, "indo_2578");
      rol = bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Error desencriptando el rol:", error);
    }
  }

  const buttons = [
    { tab: "tab1", icon: <FaRegUser />, label: "USUARIOS", roles: ["admin"] },
    { tab: "tab2", icon: <FaRadio />, label: "PROGRAMAS", roles: ["admin"] },
    {
      tab: "tab3",
      icon: <FaRegNewspaper />,
      label: "NOTICIAS",
      roles: ["admin", "editor"],
    },
    {
      tab: "tab4",
      icon: <IoMdMusicalNote />,
      label: "CANCIONES",
      roles: ["admin"],
    },
    {
      tab: "tab5",
      icon: <FaRankingStar />,
      label: "RANKING",
      roles: ["admin"],
    },
    { tab: "tab6", icon: <CiMail />, label: "MENSAJES", roles: ["admin"] },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "tab1":
        return <PanelUsuario />;
      case "tab2":
        return <PanleProgramas />;
      case "tab3":
        return <PanelNoticia />;
      case "tab4":
        return <PanelCanciones />;
      case "tab5":
        return <PanelRanking />;
      case "tab6":
        return <PanleMensaje />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[url('./assets/bg_2.jpg')] bg-cover bg-center min-h-screen">
      <div className="z-10 flex flex-col lg:grid lg:grid-cols-6 gap-4 text-white p-4 pt-20">
        <div
          className="bg-white/10 backdrop-blur-md rounded-2xl flex flex-row lg:flex-col overflow-auto 
                items-start gap-3 p-4 lg:p-6 shadow-lg"
        >
          <h3 className="hidden md:block text-indo_green font-extrabold text-xl mb-4">
            Panel de control
          </h3>

          {buttons.map(({ tab, icon, label, roles }) =>
            roles.includes(rol) ? (
              <button
                key={tab}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all duration-300
        ${
          activeTab === tab
            ? "bg-indo_green/20 text-indo_green font-semibold border-l-4 border-indo_green"
            : "hover:bg-white/10"
        }`}
                onClick={() => setActiveTab(tab)}
              >
                <span className="text-lg">{icon}</span>
                <span className="hidden lg:inline tracking-wide">{label}</span>
              </button>
            ) : null
          )}
        </div>

        <div className="col-span-5 bg-white bg-opacity-10 rounded-xl p-4 lg:p-10 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PanelPage;
