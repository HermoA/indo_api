import rankingStore from "../../store/RankingStore";
import { useEffect } from "react";

const VerRanking = () => {
  const {
    rankinCanciones,
    ranking,
    loading,
    rankinNombre,
    nombre,
    deleteRanking,
  } = rankingStore();

  useEffect(() => {
    rankinCanciones();
    rankinNombre();
  }, [rankinCanciones, rankinNombre]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar el ranking?"
    );
    if (confirmDelete) {
      deleteRanking(id);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-slate-400 py-10">Cargando ranking...</p>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Título y botón eliminar */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-b border-slate-600 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-center text-white">
          {nombre.nombre}
        </h1>
        <button
          onClick={() => handleDelete(nombre.id_ranking)}
          className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
        >
          Eliminar Ranking
        </button>
      </div>

      {/* Lista de canciones */}
      <div className="flex flex-col gap-4">
        {ranking.map((rank, index) => (
          <div
            key={index}
            className="bg-black bg-opacity-30 rounded-lg p-4 shadow-md text-white"
          >
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
              <div className="flex items-center justify-center sm:justify-start text-3xl font-bold text-indo_green">
                #{index + 1}
              </div>
              <div className="col-span-2">
                <h2 className="text-lg font-semibold">{rank.titulo}</h2>
                <p className="text-sm text-slate-300">{rank.artista}</p>
              </div>
              <div className="text-right sm:text-left text-sm font-medium text-slate-400">
                Votos: {rank.votos}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerRanking;
