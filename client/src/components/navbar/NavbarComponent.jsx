import Menu from "./Menu";
import Log from "./log";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import { logout } from "../../api/logout";
import CryptoJS from "crypto-js";
import Sociales from "./Sociales";
import Logo from "./LogoAnimado";

const NavbarComponent = () => {
  const { scrollYProgress } = useScroll();
  const { pathname } = useLocation();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3], // Desde el inicio (0%) hasta el final (100%) del scroll
    pathname === "/"
      ? ["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 1)"] // Negro → Transparente SOLO en Home
      : ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"] // Siempre negro en otras páginas
  );

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

  const nombre = localStorage.getItem("nombre");

  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      style={{ backgroundColor }}
      className="hidden fixed w-full px-[15%] font-roboto text-white z-50 lg:flex flex-col items-center"
    >
      <div className="w-full flex flex-row justify-between items-center">
        <div>
          <Sociales />
        </div>

        <Logo />

        <div className=" relative ">
          {nombre ? (
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="border-white border px-2 py-1 rounded-lg  text-xs"
            >
              {nombre}
            </button>
          ) : (
            <Log />
          )}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute mt-4 w-48 bg-black bg-opacity-55  border-gray-500 border shadow-lg rounded-md z-50"
              >
                <ul className="py-2 text-sm">
                  {rol === "admin" || rol === "editor"  ? 
                    <Link to="/panel">
                      <li
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-black hover:bg-opacity-50 hover:text-indo_green  cursor-pointer transition-all ease-in-out"
                      >
                        Panel
                      </li>
                    </Link>:""
                  }
                  <Link to="/edituser">
                    <li
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-black hover:bg-opacity-50 hover:text-indo_green  cursor-pointer transition-all ease-in-out"
                    >
                      Editar Perfil
                    </li>
                  </Link>
                  <li
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                    className="px-4 py-2 hover:bg-black hover:bg-opacity-50 hover:text-indo_green  cursor-pointer transition-all ease-in-out"
                  >
                    Cerrar sesión
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="w-full flex flex-row justify-center items-center py-3">
        <Menu />
      </div>
    </motion.div>
  );
};

export default NavbarComponent;
