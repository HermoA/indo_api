import { useEffect } from "react";
import cancionStore from "../../store/CancionStore";
import Acordeon from "../AcordeonCanciones";
import { IoClose } from "react-icons/io5";

const Vercaciones = () => {
  const { verCaciones, cancion, loading, deleteCancion } = cancionStore();

  useEffect(() => {
    verCaciones();
  }, [verCaciones]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta canción?",
    );
    if (confirmDelete) {
      deleteCancion(id);
    }
  };

  if (loading)
    return (
      <p className="text-center text-slate-400 py-10">Cargando canciones...</p>
    );

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-300px)] px-4 py-6 space-y-6 mb-20">
      {cancion.map((canciones) => (
        <div
          key={canciones.id_cancione}
          className="relative bg-black bg-opacity-30 rounded-xl shadow-md overflow-hidden"
        >
          {/* Botón eliminar */}
          <button
            onClick={() => handleDelete(canciones.id_cancione)}
            className="absolute top-3 right-12 text-xl text-slate-400 hover:text-red-500 transition"
            title="Eliminar canción"
          >
            <IoClose />
          </button>

          {/* Acordeón con iframe */}
          <div className="flex flex-row items-center">
            <Acordeon title={canciones.titulo} artista={canciones.artista}>
              <div className="w-full">
                <iframe
                  src={`https://open.spotify.com/embed/track/${canciones.link}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-md"
                ></iframe>
              </div>
            </Acordeon>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Vercaciones;
