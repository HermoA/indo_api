import Celular from "../../assets/CELULAR_APP.png";
import banner from "../../assets/bg_1.png";
import { motion } from "framer-motion";

const PresentacionApp = () => {
  return (
    <div
      className="relative text-white overflow-hidden mb-10 py-20 flex items-center justify-center"
      style={{
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <img
        src={banner}
        alt=""
        className="absolute xl:h-4/6 md:h-4/5 h-full w-full object-cover"
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6 lg:px-20">
        {/* Imagen Celular */}
        <motion.div
          className="md:w-1/4 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            className="drop-shadow-2xl hover:scale-105 hover:-rotate-2 transition-transform duration-300"
            src={Celular}
            alt="Celular"
          />
        </motion.div>

        {/* Texto */}
        <motion.div
          className="md:w-1/2 text-center md:text-left  p-8 rounded-2xl "
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
            Descarga Nuestra App Móvil
          </h2>
          <p className="text-white/90 mb-6 text-lg">
            ¡LA RADIO DE LOS ÉXITOS AHORA EN TU CELULAR! Indoamérica La Radio te
            acompaña donde vayas.
          </p>
          <p className="text-white/90 mb-6 text-lg">
            Tus programas favoritos, la mejor música y la energía de siempre…
            ¡Ahora en una sola app! Disponible solo en Android
          </p>

          <a
            href="https://play.google.com/store/apps/details?id=com.indoamerica.radio"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/50 transition duration-300"
          >
            Descargar App
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default PresentacionApp;
