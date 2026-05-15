import Player from "./Player";
import Portada from "./PortadaReproductor";
import { useState } from "react";
import Info from "./InfoPrograma";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import PortadaPlay from "./PortadaPlay";

const ReproductorPrincipal = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className=" hidden lg:block">
      <PortadaPlay />
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-40 bg-gray-950 bg-opacity-40 backdrop-blur-lg border-t border-gray-100 text-white"
        initial={false}
        animate={{ height: isExpanded ? "28rem" : "5rem" }} // 96 = 24rem, 20 = 5rem
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Encabezado del reproductor */}
        <div className="flex justify-between items-center px-5 h-20">
          <Portada />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-all ease-in bg-black bg-opacity-10 rounded-full p-5 "
          >
            {isExpanded ? <FaChevronDown /> : <FaChevronUp />}
          </button>
          <Player />
        </div>

        {/* Info expandida */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="px-5 pt-4 h-[calc(100%-80px)] overflow-hidden "
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Info />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ReproductorPrincipal;
