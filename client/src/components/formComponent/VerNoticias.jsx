import { useState, useEffect } from "react";
import Modal from "../ModalComponent";
import { IoMdOpen } from "react-icons/io";
import useNoticiaStore from "../../store/NoticiaStore";
import dayjs from "dayjs";
import "dayjs/locale/es";

// eslint-disable-next-line react/prop-types
const VerNoticias = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { verNoticia } = useNoticiaStore();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    const fetchNoticia = async () => {
      const getNoticia = await verNoticia(id);
      setNoticia({
        ...getNoticia,
        publicacion: dayjs(getNoticia.publicacion).format("YYYY-MM-DD"),
        fecha_formateada: dayjs(getNoticia.created_at)
          .locale("es")
          .format("D [de] MMMM [de] YYYY, HH:mm"),
      });
    };

    if (id && isModalOpen) fetchNoticia();
  }, [id, isModalOpen]);

  return (
    <div className="flex items-center justify-center">
      {/* Botón de apertura */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="hover:text-blue-400 transition text-lg"
        title="Ver noticia"
      >
        <IoMdOpen />
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className=""
      >
        {noticia && (
          <div className="flex flex-col gap-4 max-h-[90vh] overflow-y-auto p-4 sm:p-6 text-white text-sm sm:text-base">
            {/* Imagen + título */}
            <div className="relative w-full">
              <img
                src={noticia.img}
                alt={noticia.titulo}
                className="w-full h-52 sm:h-64 object-cover rounded-md brightness-75"
              />
              <h2 className="absolute bottom-3 left-4 text-xl sm:text-2xl font-bold text-white drop-shadow">
                {noticia.titulo}
              </h2>
            </div>
            <div className="flex items-center gap-2 pb-4 text-white ">
              <p>{noticia.categoria}</p>
              <p className="text-indo_green">-</p>
              <p>{noticia.sub_categoria}</p>
            </div>

            {/* Autor + Fecha */}
            <div className="text-xs sm:text-sm text-gray-400">
              <p>
                <span className="font-semibold text-white">
                  {noticia.autor}
                </span>{" "}
                | {noticia.fecha_formateada}
              </p>
            </div>

            {/* Lead */}
            <p className="text-slate-300 font-light">{noticia.lead}</p>

            {/* Cuerpo */}
            <div className="text-slate-200 whitespace-pre-wrap leading-relaxed">
              {noticia.cuerpo}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VerNoticias;
