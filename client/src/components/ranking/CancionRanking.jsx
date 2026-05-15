import { useEffect, useCallback } from "react";
import rankingStore from "../../store/RankingStore";
import rankingPortadasStore from "../../store/RankingPortadasStore";
import { motion } from "framer-motion";
import { IoPlay } from "react-icons/io5";
import logo from "../../assets/portada_1.jpg";

// ─── Constantes ───────────────────────────────────────────────────────────────
const SPOTIFY_BASE_URL = "https://open.spotify.com/track/";

// ─── Subcomponente: tarjeta individual del top 5 ─────────────────────────────
const CancionCard = ({ cancion, index, onPlay }) => {
  const { portadas, fetchPortada } = rankingPortadasStore();

  // Carga la portada al montar
  useEffect(() => {
    fetchPortada(cancion.id_cancione, cancion.titulo, cancion.artista);
  }, [cancion.id_cancione, cancion.titulo, cancion.artista, fetchPortada]);

  const portada = portadas[cancion.id_cancione];

  return (
    <motion.div
      key={cancion.id_cancione || index}
      className="relative flex flex-col items-center justify-center rounded-xl overflow-hidden
        shadow-lg border border-gray-700 bg-gray-800 cursor-pointer group h-64 md:h-72 lg:h-80"
      whileHover={{
        scale: 1.07,
        rotate: index % 2 === 0 ? 3 : -3,
        boxShadow: `
          0 0 15px rgba(0, 113, 188, 0.7),
          0 0 30px rgba(0, 227, 128, 0.7),
          0 0 45px rgba(0, 113, 188, 0.7)
        `,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Portada de fondo */}
      {portada ? (
        <img
          src={portada}
          alt={`Portada de ${cancion.titulo}`}
          className="w-full h-full object-cover absolute inset-0 transition-all duration-300
            brightness-50 group-hover:brightness-100 z-0"
        />
      ) : (
        <img
          src={logo}
          alt="Portada por defecto"
          className="w-full h-full object-cover absolute inset-0 brightness-50 z-0"
        />
      )}

      {/* Número de posición */}
      <h3 className="absolute text-8xl md:text-9xl font-extrabold text-white z-10
        pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
        {index + 1}
      </h3>

      {/* Info inferior (visible en reposo) */}
      <div className="absolute bottom-0 left-0 w-full bg-black/40 rounded-b-lg p-3 z-10
        flex flex-col items-start px-4 transition-opacity duration-300 group-hover:opacity-0">
        <p className="font-bold text-lg md:text-xl line-clamp-1">
          {cancion.artista}
        </p>
        <p className="text-gray-200 text-sm md:text-base line-clamp-1">
          {cancion.titulo}
        </p>
      </div>

      {/* Botón de reproducción en Spotify */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onPlay(cancion.link);
        }}
        className="absolute top-4 right-4 md:top-6 md:right-6 bg-gradient-to-br from-green-500
          to-green-700 text-white rounded-full p-3 shadow-xl opacity-0 scale-0
          group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-50
          flex items-center justify-center"
        whileHover={{ scale: 1.2, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        <IoPlay />
      </motion.button>

      {/* Overlay con info completa (visible en hover) */}
      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center
        p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40">
        <p className="font-bold text-xl md:text-2xl text-green-400 mb-2 line-clamp-2">
          {cancion.titulo}
        </p>
        <p className="text-lg md:text-xl text-gray-200 mb-4 line-clamp-1">
          {cancion.artista}
        </p>
      </div>
    </motion.div>
  );
};

// ─── Componente principal ─────────────────────────────────────────────────────
const CancionRanking = () => {
  const { rankinCanciones, ranking, loading, rankinNombre, nombre } = rankingStore();

  // Carga inicial del ranking y nombre
  useEffect(() => {
    rankinCanciones();
    rankinNombre();
  }, [rankinCanciones, rankinNombre]);

  // Abre el link de Spotify en nueva pestaña
  const openSpotifyLink = useCallback((link) => {
    window.open(`${SPOTIFY_BASE_URL}${link}`, "_blank", "noopener,noreferrer");
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-2xl font-semibold text-white">
        Cargando ranking...
      </div>
    );
  }

  const rankingTitle = nombre?.nombre ? `Top 5 ${nombre.nombre}` : "Top 5 Canciones";

  return (
    <div className="flex flex-col items-center justify-center py-8 font-roboto text-white">

      {/* Título */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center px-4 mb-8">
        {rankingTitle}
      </h2>

      {/* Grid de canciones */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {ranking.slice(0, 5).map((cancion, index) => (
          <CancionCard
            key={cancion.id_cancione || index}
            cancion={cancion}
            index={index}
            onPlay={openSpotifyLink}
          />
        ))}
      </div>

    </div>
  );
};

export default CancionRanking;