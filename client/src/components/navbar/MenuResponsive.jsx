import { useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "../../api/logout";
import CryptoJS from "crypto-js";
import Sociales from "./Sociales";

const menuItemsGuest = [
  { label: "INICIO", path: "/" },
  { label: "NOTICIAS", path: "/noticias" },
  { label: "RANKING", path: "/ranking" },
  { label: "CONTACTANOS", path: "/contacto" },
  { label: "NOSOTROS", path: "/about" },
  { label: "REGISTRATE", path: "/registro" },
  { label: "INICIA SESIÓN", path: "/login" },
];

const baseMenuItems = [
  { label: "INICIO", path: "/" },
  { label: "NOTICIAS", path: "/noticias" },
  { label: "RANKING", path: "/ranking" },
  { label: "CONTACTANOS", path: "/contacto" },
  { label: "NOSOTROS", path: "/about" },
];

const MenuResponsive = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const nombre = localStorage.getItem("nombre");
  const toggleMenu = () => setIsOpen(!isOpen);

  const encrypted = localStorage.getItem("rol");
  let rol = null;

  if (encrypted) {
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, "indo_2578");
      rol = bytes.toString(CryptoJS.enc.Utf8);
      if (!rol) console.warn("La desencriptación no devolvió un valor válido.");
    } catch (error) {
      console.error("Error desencriptando el rol:", error);
    }
  }

  const handleLogout = () => {
    logout();
    toggleMenu();
  };

  const renderMenuItems = (items) =>
    items.map((item, i) => (
      <motion.li
        key={item.label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        onClick={toggleMenu}
        className="hover:text-blue-500 transition-colors duration-200"
      >
        {item.path.startsWith("/") ? (
          <Link to={item.path}>{item.label}</Link>
        ) : (
          <a href={item.path}>{item.label}</a>
        )}
      </motion.li>
    ));

  const menuItemsUser =
    rol === "admin" || rol === "editor"
      ? [...baseMenuItems, { label: "PANEL", path: "/panel" }]
      : baseMenuItems;

  // 👉 Detectar scroll para ocultar/mostrar el menú
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 80) {
        setVisible(false); // hacia abajo
      } else {
        setVisible(true); // hacia arriba
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div>
      {/* Barra superior responsive con scroll hide/show */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -80 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden fixed top-0 left-0 z-50 w-full flex justify-between items-center p-4 bg-black bg-opacity-55 backdrop-blur-md"
      >
        {/* Botón de menú */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white text-2xl"
        >
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
        <Sociales />
      </motion.div>

      {/* Menú desplegable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center space-y-6"
          >
            {nombre && (
              <span className="text-lg font-semibold text-gray-700">
                {nombre}
              </span>
            )}

            <ul className="text-2xl font-medium space-y-4">
              {renderMenuItems(nombre ? menuItemsUser : menuItemsGuest)}

              {nombre && (
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    Cerrar Sesión
                  </button>
                </motion.li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuResponsive;
