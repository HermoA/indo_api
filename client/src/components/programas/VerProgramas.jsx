import { useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import programaStore from "../../store/ProgramaStore";
import indoTime from "../../assets/indotime.svg";
import Programacion from "../../assets/PROGRAMACION.png";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import dayjs from "dayjs";

// ─── Utilidad: formatea hora a HH:mm ─────────────────────────────────────────
const formatHour = (time) => {
  if (time == null) return "";
  const s = String(time);
  const m = s.match(/(\d{1,2}):(\d{2})/);
  if (m) return `${m[1].padStart(2, "0")}:${m[2]}`;
  const t = dayjs(time);
  return t.isValid() ? t.format("HH:mm") : s;
};

// ─── Variantes de animación (scale no afecta el flujo del documento) ──────────
const fadeIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─── Estilos fijos del timeline (evita recrearlos en cada render) ─────────────
const timelineContentStyle = {
  background: "transparent",
  color: "#fff",
  borderRadius: "0",
  boxShadow: "none",
  padding: "0",
};

const timelineArrowStyle = { borderRight: "10px solid transparent" };
const timelineIconStyle = {
  color: "#fff",
  marginTop: "40px",
  width: "60px",
  height: "60px",
  boxShadow: "none",
};

// ─── Subcomponente: icono del timeline ───────────────────────────────────────
const TimelineIcon = ({ nombre }) => (
  <div className="p-4">
    <img
      src={indoTime}
      alt={nombre}
      className="w-full h-full object-cover rounded-full"
    />
  </div>
);

TimelineIcon.propTypes = {
  nombre: PropTypes.string.isRequired,
};

// ─── Subcomponente: contenido de cada programa ───────────────────────────────
const ProgramaCard = ({ prog, isRight }) => (
  <div className="overflow-hidden">
    <motion.div
      className={`flex items-center gap-4 ${isRight ? "flex-row" : "flex-row-reverse"}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
    >
      {/* Logo del programa */}
      <img
        src={prog.logo_programa}
        alt={prog.nombre_programa}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover
          border-2 border-green-500 flex-shrink-0"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      {/* Info */}
      <div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-green-400 mb-1">
          {prog.nombre_programa}
        </h3>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {prog.descripcion}
        </p>
      </div>
    </motion.div>
  </div>
);

ProgramaCard.propTypes = {
  prog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre_programa: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    logo_programa: PropTypes.string.isRequired,
    horario_in: PropTypes.string,
    horario_out: PropTypes.string,
  }).isRequired,
  isRight: PropTypes.bool.isRequired,
};

// ─── Componente principal ─────────────────────────────────────────────────────
const VerProgramas = () => {
  const { programa, verProgramas } = programaStore();

  useEffect(() => {
    verProgramas();
  }, [verProgramas]);

  if (!programa?.length) return null;

  return (
    <div className="my-20 py-20 px-4 sm:px-8 lg:px-16 rounded-lg shadow-lg">
      {/* Cabecera */}
      <motion.img
        src={Programacion}
        alt="Programación"
        className="w-96 mx-auto py-20"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      />

      {/* Timeline */}
      <VerticalTimeline lineColor="#22c55e">
        {programa.map((prog, index) => {
          const isRight = index % 2 !== 0;
          const horario = `${formatHour(prog.horario_in)} - ${formatHour(prog.horario_out)}`;

          return (
            <VerticalTimelineElement
              key={prog.id}
              className="vertical-timeline-element--work"
              contentStyle={timelineContentStyle}
              contentArrowStyle={timelineArrowStyle}
              iconStyle={timelineIconStyle}
              date={horario}
              icon={<TimelineIcon nombre={prog.nombre_programa} />}
              position={isRight ? "right" : "left"}
            >
              <ProgramaCard prog={prog} isRight={isRight} />
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
};

export default VerProgramas;
