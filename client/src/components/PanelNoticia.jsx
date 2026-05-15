import { useEffect, useState } from "react";
import NoticiaStore from "../store/NoticiaStore";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { IoClose } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import Acordeon from "../components/Acordeon";
import CrearNoticia from "../components/formComponent/Createnoticia";
import Update from "../components/formComponent/UpdateNoticias";
import VerNoticias from "../components/formComponent/VerNoticias";

const PanelNoticia = () => {
  const { verNoticias, noticia, loading, deleteNoticia } = NoticiaStore();
  const [idNoticia, setIdNoticia] = useState(null);
  const [idNoticiamodal, setIdNoticiamodal] = useState(null);

  useEffect(() => {
    verNoticias();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta noticia?"
    );
    if (confirmDelete) {
      deleteNoticia(id);
    }
  };

  if (loading)
    return (
      <p className="text-center py-10 text-gray-400">Cargando noticias...</p>
    );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Sección Crear */}
      <Acordeon title="Crear Noticia">
        <CrearNoticia />
      </Acordeon>

      {/* Sección Editar */}
      {idNoticia && (
        <div className="relative mt-6 border border-slate-200 p-4 rounded-md shadow-md">
          <button
            onClick={() => setIdNoticia(null)}
            className="absolute top-2 right-2 text-xl hover:text-red-500 transition"
          >
            <IoClose />
          </button>
          <Update id={idNoticia} />
        </div>
      )}

      {/* Modal para ver noticia */}
      {idNoticiamodal && (
        <div></div>
      )}

      {/* Lista de Noticias */}
      <div className="mt-8 flex flex-col gap-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        {noticia.map((n) => (
          <div
            key={n.id_noticia}
            className="relative bg-black bg-opacity-30 text-white rounded-xl shadow p-4"
          >
            {/* Botones */}
            <div className="absolute bg-black bg-opacity-20 rounded-full p-1 top-2 right-2 flex flex-row gap-2 w-24 md:w-auto justify-between">
              <button onClick={() => setIdNoticiamodal(n.id_noticia)}>
                <VerNoticias id={idNoticiamodal} />                
              </button>
              <button
                onClick={() => setIdNoticia(n.id_noticia)}
                className="hover:text-indo_green transition"
              >
                <FaRegEdit />
              </button>
              <button
                onClick={() => handleDelete(n.id_noticia)}
                className="hover:text-red-500 transition"
              >
                <IoClose />
              </button>
            </div>

            {/* Contenido */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <img
                src={n.img}
                alt={n.titulo}
                className="w-full md:w-60 h-60 object-cover rounded-md"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-indo_green mb-1">
                  {n.titulo}
                </h2>
                <p className="text-sm text-slate-300 mb-1">{n.lead}</p>
                <p className="text-xs text-gray-400 mb-1">Fuente: {n.autor}</p>
                <p className="text-xs text-gray-400">
                  {dayjs(n.created_at)
                    .locale("es")
                    .format("D [de] MMMM [de] YYYY, HH:mm")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelNoticia;
