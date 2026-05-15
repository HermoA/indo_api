import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";

// eslint-disable-next-line react/prop-types
const NeonBorderCard = ({ logo_programa, nombre_programa, descripcion }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHover, setIsHover] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Gradiente para el halo exterior
  const outerGlow = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x}px ${y}px, #00e380aa 0%, transparent 80%)`
  );

  // Gradiente para el borde (más delgado y recortado en el centro)
  const borderGlow = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(180px circle at ${x}px ${y}px, #00e380 60%, transparent 100%)`
  );

  // Máscara para dejar solo el borde visible
  const borderMask =
    "radial-gradient(circle, transparent 60%, black 60%, black 100%)";

  return (
    <div className="relative flex items-center justify-center my-12 mx-10">
      {/* Halo exterior */}
      <motion.div
        className="pointer-events-none absolute -inset-2 rounded-lg z-0"
        style={{
          background: outerGlow,
          filter: "blur(16px)",
          mixBlendMode: "lighten",
          opacity: isHover ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      {/* Borde neón dinámico */}
      <motion.div
        className="pointer-events-none absolute -inset-1 rounded-2xl z-10"
        style={{
          background: borderGlow,
          WebkitMaskImage: borderMask,

          opacity: isHover ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      {/* Tarjeta principal */}
      <motion.div
        ref={cardRef}
        className="relative overflow-hidden z-20 border-2 border-transparent shadow-xl w-[340px] rounded-full aspect-square flex flex-col justify-end"
        style={{
          backgroundImage: `url(${logo_programa})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {/* Degradado inferior */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
        {/* Contenido */}
      </motion.div>
      <div className="relative z-20 p-6 flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-white mb-2 drop-shadow">
          {nombre_programa}
        </h2>
        <p className="text-white/80 text-base drop-shadow">{descripcion}</p>
      </div>
    </div>
  );
};

export default NeonBorderCard;
