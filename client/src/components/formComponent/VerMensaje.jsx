import { useEffect, useState } from "react";
import useMensajeStore from "../../store/MensajeStore";
import { IoMdOpen } from "react-icons/io";
import Modal from "../ModalComponent";

// eslint-disable-next-line react/prop-types
const VerMensaje = ({ id }) => {
  const { fetchMensajeById, mensaje } = useMensajeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMensaje = async () => {
      await fetchMensajeById(id);
    };
    if (id) fetchMensaje();
  }, [fetchMensajeById, id]);

  return (
    <div>
      {/* Botón de apertura */}
      <button onClick={() => setIsModalOpen(true)} className="text-xl hover:text-indo_green">
        <IoMdOpen />
      </button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4 md:p-8 max-w-2xl mx-auto text-white space-y-6">
          {/* Asunto */}
          <h3 className="text-2xl md:text-3xl font-bold text-center">
            {mensaje.asunto}
          </h3>

          {/* Datos del mensaje */}
          <div className="space-y-2 text-sm md:text-base">
            <p><span className="font-semibold">Fecha:</span> {mensaje.created_at}</p>
            <p><span className="font-semibold">Nombre:</span> {mensaje.nombre}</p>
            <p><span className="font-semibold">Cel:</span> {mensaje.telefono}</p>
            <p><span className="font-semibold">Correo:</span> {mensaje.correo}</p>
          </div>

          {/* Contenido del mensaje */}
          <div className="bg-white bg-opacity-5 border border-white rounded-xl px-4 py-6 text-sm md:text-base">
            <p className="font-semibold mb-2">Mensaje:</p>
            <p className="text-gray-200 whitespace-pre-line">{mensaje.mensaje}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VerMensaje;
