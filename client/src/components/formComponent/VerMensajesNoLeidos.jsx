import { useEffect, useState } from "react";
import useMensajeStore from "../../store/MensajeStore";
import { IoClose } from "react-icons/io5";
import VerMensaje from "../formComponent/VerMensaje";

const VerMensajesNoLeidos = () => {
  const {
    fetchMensajesNoLeidos,
    mensajesNoLeidos,
    removeMensaje,
    mensajeLeiodo,
  } = useMensajeStore();
  const [idMensajeModal, setIdMensajeModal] = useState(null);

  useEffect(() => {
    try {
      const fetchMensajes = async () => {
        await fetchMensajesNoLeidos();
      };
      fetchMensajes();
    } catch (error) {
      console.error("Error al cargar mensajes no leídos:", error);
    }
    
  }, [fetchMensajesNoLeidos]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar este mensaje?"
    );
    if (confirmDelete) {
      removeMensaje(id);
    }
  };

  const handleLeido = (id) => {
    mensajeLeiodo(id);
    setIdMensajeModal(id);
  };

  if (mensajesNoLeidos.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No hay mensajes no leídos.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {mensajesNoLeidos.map((men) => (
        <div
          key={men.id_contacto}
          className="relative bg-black bg-opacity-30 rounded-xl px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white shadow"
        >
          {/* Acciones */}
          <div className="flex items-center gap-3 absolute top-2 right-4 md:static md:order-last">
            <button
              onClick={() => handleLeido(men.id_contacto)}
              className="text-indo_green hover:opacity-80"
              title="Ver mensaje"
            >
              Ver
            </button>
            <VerMensaje
              id={idMensajeModal === men.id_contacto ? idMensajeModal : null}
            />
            <button
              onClick={() => handleDelete(men.id_contacto)}
              className="text-red-500 hover:text-red-700"
              title="Eliminar"
            >
              <IoClose />
            </button>
          </div>

          {/* Contenido */}
          <div className="flex-1 space-y-1 text-sm md:text-base">
            <h3 className="font-bold">{men.nombre}</h3>
            <p>{men.telefono}</p>
            <p>{men.correo}</p>
            <p className="italic text-slate-300">{men.asunto}</p>
          </div>

          {/* Estado leído */}
          <div className="flex items-center md:ml-4">
            <div
              className={`w-3 h-3 rounded-full ${
                men.leido === 1 ? "bg-indo_green" : "bg-red-500"
              }`}
              title={men.leido === 1 ? "Leído" : "No leído"}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerMensajesNoLeidos;
