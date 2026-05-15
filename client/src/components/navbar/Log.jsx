import { RiUserLine } from "react-icons/ri";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Register from "../RegisterComponent";
import Login from "../LoginComponent";
import { IoCloseSharp } from "react-icons/io5";

const Log = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [OpenLogin, setOpenLogin] = useState(false);
  const [OpenReg, setOpenReg] = useState(false);
  return (
    <div className="w-36 flex justify-center items-center text-xl relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-black p-2 rounded-full transition duration-300 ease-in-out  "
      >
        <RiUserLine />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-40 w-48 bg-black bg-opacity-55  border-gray-500 border shadow-lg rounded-md z-50"
          >
            <ul className="py-2 text-sm">
              <li
                onClick={() => {
                  setOpenLogin(!OpenLogin);
                  setIsOpen(false);
                }}
                className="px-4 py-2 hover:bg-black hover:bg-opacity-50 hover:text-indo_green  cursor-pointer transition-all ease-in-out"
              >
                Iniciar sesión
              </li>
              <li
                onClick={() => {
                  setOpenReg(!OpenReg);
                  setIsOpen(false);
                }}
                className="px-4 py-2 hover:bg-black hover:bg-opacity-50 hover:text-indo_green  cursor-pointer transition-all ease-in-out"
              >
                Registrate
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {OpenLogin && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-[330px] w-72 bg-black bg-opacity-80  border-gray-500 border shadow-lg rounded-md z-50"
          >
            <button
              onClick={() => setOpenLogin(false)}
              className="absolute top-2 right-2 "
            >
              <IoCloseSharp />
            </button>
            <Login />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {OpenReg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-[500px] w-80 bg-black bg-opacity-80  border-gray-500 border shadow-lg rounded-md z-50"
          >
            <button
              onClick={() => setOpenReg(false)}
              className="absolute top-2 right-2 "
            >
              <IoCloseSharp />
            </button>
            <Register />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Log;
