import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import rankingStore from "../../store/RankingStore";
import Acordeon from "../AcordeonCanciones";
import none from "../../assets/like_none.svg";
import like from "../../assets/like.svg";
import logo from "../../assets/portada_1.jpg";
import { motion } from "framer-motion";
import rankingPortadasStore from "../../store/RankingPortadasStore";

// ─── Constantes ───────────────────────────────────────────────────────────────
const MILISEGUNDOS_EN_24_HORAS = 24 * 60 * 60 * 1000;

// ─── Variantes de animación ───────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 10, mass: 0.8 },
  },
};

const likeButtonVariants = {
  initial: { scale: 1 },
  tap:     { scale: 0.9 },
  vote:    { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
  unvote:  { scale: [1, 0.8, 1], transition: { duration: 0.3 } },
};

// ─── Color del número según posición ─────────────────────────────────────────
const getRankColor = (index) => {
  if (index === 0) return "text-yellow-400 drop-shadow-lg";
  if (index === 1) return "text-gray-300 drop-shadow-lg";
  if (index === 2) return "text-orange-400 drop-shadow-lg";
  return "text-gray-400";
};

// ─── Subcomponente: tarjeta individual de canción ─────────────────────────────
const RankingItem = ({ item, index, hasUserVoted, onVote, onDelVote }) => {
  const { portadas, fetchPortada } = rankingPortadasStore();

  // Carga la portada al montar
  useEffect(() => {
    fetchPortada(item.id_cancione, item.titulo, item.artista);
  }, [item.id_cancione, item.titulo, item.artista, fetchPortada]);

  const portada = portadas[item.id_cancione];

  return (
    <motion.div
      className="flex flex-col bg-gray-800/80 rounded-xl shadow-lg border border-gray-700
        hover:border-blue-500 hover:shadow-2xl transition-all duration-300 overflow-hidden group"
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
    >
      {/* ── Fila principal: número + portada + info + votos ── */}
      <div className="flex flex-row items-center w-full gap-2 sm:gap-4 p-3 sm:p-4">

        {/* Posición en el ranking */}
        <div className="flex-shrink-0 w-10 sm:w-16 flex items-center justify-center">
          <p className={`font-extrabold text-3xl sm:text-5xl transition-colors duration-300
            group-hover:text-white ${getRankColor(index)}`}>
            {index + 1}
          </p>
        </div>

        {/* Portada */}
        <img
          src={portada || logo}
          alt={`Portada de ${item.titulo}`}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg shadow-md flex-shrink-0 object-cover"
        />

        {/* Título y artista */}
        <div className="flex-grow text-left overflow-hidden">
          <p className="text-base sm:text-lg font-semibold text-white truncate">
            {item.titulo || "Título Desconocido"}
          </p>
          <p className="text-gray-400 text-sm sm:text-base truncate">
            {item.artista || "Artista Desconocido"}
          </p>
        </div>

        {/* Botón de voto + contador */}
        <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
          <motion.button
            onClick={() => hasUserVoted ? onDelVote(item.id_cancione) : onVote(item.id_cancione)}
            className={`p-2 sm:p-3 rounded-full transition-colors duration-300
              ${hasUserVoted ? "hover:bg-blue-700/50" : "hover:bg-gray-600/50"}`}
            variants={likeButtonVariants}
            whileTap="tap"
            animate={hasUserVoted ? "vote" : "unvote"}
          >
            <img
              src={hasUserVoted ? like : none}
              alt={hasUserVoted ? "Quitar voto" : "Votar"}
              className="w-6 h-6 sm:w-7 sm:h-7"
            />
          </motion.button>
          <span className="text-base sm:text-lg font-bold text-white min-w-[1.5rem] text-center">
            {item.votos}
          </span>
        </div>

      </div>

      {/* ── Acordeón: player de Spotify ── */}
      <div className="border-t border-gray-700/60">
        <Acordeon title="Escuchar en Spotify" artista={item.artista}>
          <iframe
            src={`https://open.spotify.com/embed/track/${item.link}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={`Spotify - ${item.titulo}`}
          />
        </Acordeon>
      </div>

    </motion.div>
  );
};

RankingItem.propTypes = {
  item: PropTypes.shape({
    id_cancione: PropTypes.number.isRequired,
    titulo:      PropTypes.string,
    artista:     PropTypes.string,
    votos:       PropTypes.number,
    link:        PropTypes.string,
  }).isRequired,
  index:        PropTypes.number.isRequired,
  hasUserVoted: PropTypes.bool,
  onVote:       PropTypes.func.isRequired,
  onDelVote:    PropTypes.func.isRequired,
};

// ─── Componente principal ─────────────────────────────────────────────────────
const ListaRanking = () => {
  const { rankinCanciones, ranking, voto, delVoto, rankinNombre, nombre } = rankingStore();
  const [hasVotedToday, setHasVotedToday] = useState({});

  // Carga inicial del ranking y nombre
  useEffect(() => {
    rankinCanciones();
    rankinNombre();
  }, [rankinCanciones, rankinNombre]);

  // Sincroniza el estado de votos con localStorage
  useEffect(() => {
    if (!ranking.length) return;

    const voteStatus = {};
    ranking.forEach(({ id_cancione }) => {
      const horaGuardada = localStorage.getItem(`hora_actual_${id_cancione}`);
      if (!horaGuardada) {
        voteStatus[id_cancione] = false;
        return;
      }
      const diferencia = Date.now() - parseInt(horaGuardada, 10);
      if (diferencia > MILISEGUNDOS_EN_24_HORAS) {
        localStorage.removeItem(`selected_option_${id_cancione}`);
        localStorage.removeItem(`hora_actual_${id_cancione}`);
        voteStatus[id_cancione] = false;
      } else {
        voteStatus[id_cancione] = true;
      }
    });

    setHasVotedToday(voteStatus);
  }, [ranking]);

  // Registra un voto y lo persiste en localStorage
  const handleVote = useCallback(async (id) => {
    localStorage.setItem(`selected_option_${id}`, id);
    localStorage.setItem(`hora_actual_${id}`, Date.now());
    setHasVotedToday((prev) => ({ ...prev, [id]: true }));
    try {
      await voto({ id_cancione: id });
    } catch (error) {
      console.error("Error al votar:", error);
      localStorage.removeItem(`selected_option_${id}`);
      localStorage.removeItem(`hora_actual_${id}`);
      setHasVotedToday((prev) => ({ ...prev, [id]: false }));
    }
  }, [voto]);

  // Elimina un voto y lo limpia de localStorage
  const handleDelVote = useCallback(async (id) => {
    localStorage.removeItem(`selected_option_${id}`);
    localStorage.removeItem(`hora_actual_${id}`);
    setHasVotedToday((prev) => ({ ...prev, [id]: false }));
    try {
      await delVoto(id);
    } catch (error) {
      console.error("Error al eliminar voto:", error);
      localStorage.setItem(`selected_option_${id}`, id);
      localStorage.setItem(`hora_actual_${id}`, Date.now());
      setHasVotedToday((prev) => ({ ...prev, [id]: true }));
    }
  }, [delVoto]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 py-12 md:py-20 text-white">

      {/* Encabezado */}
      <div className="text-center my-12 px-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
          {nombre?.nombre || "Ranking de Canciones"}
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          {nombre?.descripcion || "¡Vota por tus canciones favoritas y descubre las más populares!"}
        </p>
      </div>

      {/* Lista animada de canciones */}
      <motion.div
        className="w-full max-w-5xl mx-auto grid grid-cols-1 gap-4 md:gap-6 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {ranking.map((item, index) => (
          <RankingItem
            key={item.id_cancione}
            item={item}
            index={index}
            hasUserVoted={hasVotedToday[item.id_cancione]}
            onVote={handleVote}
            onDelVote={handleDelVote}
          />
        ))}
      </motion.div>

    </div>
  );
};

export default ListaRanking;