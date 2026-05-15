import useNoticiaStore from "../../store/NoticiaStore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { Helmet } from "react-helmet";

const GetNoticia = () => {
  const [Noticia, setNoticia] = useState(false);
  const { verNoticia } = useNoticiaStore();
  const { id } = useParams();

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const response = await verNoticia(id);
        setNoticia(response);
      } catch (error) {
        console.error("Error fetching noticia data:", error);
      }
    };
    fetchNoticia();
  }, [verNoticia, id]);

  if (!Noticia) {
    return (
      <div className="text-center mt-10 text-gray-500">Cargando noticia...</div>
    );
  }

  
  return (
    <>
      <Helmet>
        <meta property="og:title" content={Noticia.titulo} />
        <meta property="og:description" content={Noticia.lead} />
        <meta property="og:image" content={Noticia.img} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Indoamérica La Radio" />

        {/* Twitter preview */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={Noticia.titulo} />
        <meta name="twitter:description" content={Noticia.lead} />
        <meta name="twitter:image" content={Noticia.img} />
      </Helmet>
      <div className=" text-gray-900 leading-relaxed sm:mt-12">
        {/* Contenido principal */}
        <div className="max-w-6xl mx-auto px-6 py-10 font-Opensans">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4 font-semibold lg:pl-10">
            <p className="border-b-2 border-indo_green">{Noticia.categoria}</p>
            <p>-</p>
            <p className="border-b-2 border-indo_green">
              {Noticia.sub_categoria}
            </p>
          </div>
          <h1 className="lg:text-5xl text-3xl font-poppins font-bold mb-4">
            {Noticia.titulo}
          </h1>
          <p className="lg:text-2xl text-lg text-gray-700 italic mb-6">
            {Noticia.lead}
          </p>

          {/* Autor y fecha */}
          <div className="flex justify-between text-sm text-gray-500 border-t border-b border-gray-200 py-2 mb-6">
            <span>Fuente: {Noticia.autor}</span>
            <span>
              Publicado:{" "}
              {dayjs(Noticia.publicacion)
                .locale("es")
                .format("D [de] MMMM [de] YYYY")}
            </span>
          </div>

          {/* Imagen destacada */}
          <img
            src={Noticia.img}
            alt="noticia"
            className="w-full lg:h-[550px] lg:object-cover object-contain rounded-md shadow-md lg:mb-20"
          />
          <div className="flex sm:flex-row flex-col-reverse  gap-8 mx-4">
            {/* botones compartir */}

            <div className="flex sm:flex-col flex-row justify-between sm:justify-start  gap-4 text-lg">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-200 hover:text-blue-600 flex justify-items-center items-center rounded-full text-gray-800 hover:bg-white border-2 border-slate-200 p-3 transition-all ease-in"
              >
                <FaFacebookF />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-200 flex justify-items-center items-center rounded-full text-gray-800 hover:bg-white border-2 border-slate-200 p-3 transition-all ease-in"
              >
                <FaXTwitter />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-200 hover:text-green-500 flex justify-items-center items-center rounded-full text-gray-800 hover:bg-white border-2 border-slate-200 p-3 transition-all ease-in"
              >
                <FaWhatsapp />
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Enlace copiado al portapapeles");
                }}
                className="bg-slate-200 hover:text-indo_green flex justify-items-center items-center rounded-full text-gray-800 hover:bg-white border-2 border-slate-200 p-3 transition-all ease-in"
                title="Copiar enlace"
              >
                <FaLink />
              </button>
            </div>

            {/* Cuerpo de la noticia */}

            <p className="lg:text-xl text-lg whitespace-pre-wrap leading-relaxed text-justify">
              {Noticia.cuerpo}
            </p>
            <div className=" flex justify-center items-center text-gray-500 text-sm mt-4 bg-slate-100 sm:w-2/12">
              <p className="p-5">publicidad</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetNoticia;
