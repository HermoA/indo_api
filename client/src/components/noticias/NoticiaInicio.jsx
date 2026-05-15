import { useEffect, useState } from "react";
import useNoticiaStore from "../../store/NoticiaStore";
import { getDolar } from "../../api/dolar";
import { useNavigate } from "react-router-dom";
import publibaner from "../../assets/publiBanner.jpeg";

const NoticiaInicio = () => {
  const { noticia, verNoticias, loading } = useNoticiaStore();
  const [dolar, setDolar] = useState(null);
  const navigate = useNavigate();

  const slugify = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // elimina acentos
      .replace(/\s+/g, "-") // espacios por guiones
      .replace(/[^a-z0-9-]/g, ""); // elimina caracteres especiales

  const handleClick = (id, titulo) => {
    const slug = slugify(titulo);
    navigate(`/noticia/${id}/${slug}`);
  };

  useEffect(() => {
    verNoticias();
    const fetchDolar = async () => {
      try {
        const response = await getDolar();
        setDolar(response);
      } catch (error) {
        console.error("Error fetching dollar data:", error);
      }
    };
    fetchDolar();
  }, [verNoticias]); // `verNoticias` should be stable if it comes from a Zustand store, but including it is safe.

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-semibold">
        Cargando noticias...
      </div>
    );
  }

  if (!noticia || noticia.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-semibold text-gray-600">
        No hay noticias disponibles.
      </div>
    );
  }

  // Destructure for easier access and clarity
  const [mainNoticia, ...restNoticias] = noticia;
  const featuredNoticias = restNoticias.slice(0, 5); // Get the next 5 for the featured section

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Header Section */}
      <header className="w-full border-b border-gray-300 py-4 text-center font-poppins font-bold">
        <h1 className="text-4xl md:text-5xl text-gray-900 tracking-tight">
          INDOAMÉRICA NOTICIAS
        </h1>
      </header>

      {/* Dolar Information */}
      {dolar && dolar.length > 0 && (
        <section className="w-11/12 md:w-8/12 lg:w-7/12 flex flex-col md:flex-row gap-2 p-4 border-b border-gray-300 bg-gray-50 rounded-lg shadow-sm">
          <p className="text-md md:text-lg text-gray-700">
            <span className="font-semibold ">Dólar Oficial Compra:</span>{" "}
            <span className="font-bold text-green-700">
              {dolar[0]?.compra || "N/A"} Bs.
            </span>
          </p>
          <p className="text-md md:text-lg text-gray-700 md:ml-4">
            <span className="font-semibold">Dólar Oficial Venta:</span>{" "}
            <span className="font-bold text-red-700">
              {dolar[0]?.venta || "N/A"} Bs.
            </span>
          </p>
          {dolar[1] && (
            <p className="text-md md:text-lg text-gray-700 md:ml-4">
              <span className="font-semibold">Dólar Binance Venta:</span>{" "}
              <span className="font-bold text-blue-700">
                {dolar[1]?.venta || "N/A"} Bs.
              </span>
            </p>
          )}
        </section>
      )}

      {/* Main News Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 md:w-8/12 lg:w-7/12 p-4 border-b border-gray-300 font-Opensans">
        {/* Featured Main News */}
        {mainNoticia && (
          <button
            onClick={() =>
              handleClick(mainNoticia.id_noticia, mainNoticia.titulo)
            }
            className="md:col-span-1 row-span-2 pr-0 md:pr-4 md:border-r md:border-gray-300 hover:opacity-80 transition-opacity duration-200 text-start flex flex-col gap-2 group"
          >
            <img
              src={mainNoticia.img}
              alt={mainNoticia.titulo}
              className="w-full h-auto max-h-96 object-cover rounded-md shadow-sm group-hover:shadow-md transition-shadow duration-200"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors duration-200">
              {mainNoticia.titulo}
            </h2>
            <p className="text-lg text-gray-700 font-normal leading-relaxed">
              {mainNoticia.lead}{" "}
            </p>
            <p className="text-sm text-gray-500 mt-auto">
              Por <span className="font-semibold">{mainNoticia.autor}</span>
            </p>
          </button>
        )}

        {/* Smaller Featured News - Top Row */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 md:border-b md:border-gray-300">
          {featuredNoticias[0] && (
            <button
              onClick={() =>
                handleClick(
                  featuredNoticias[0].id_noticia,
                  featuredNoticias[0].titulo,
                )
              }
              className="pr-0 md:pr-4 md:border-r md:border-gray-300 hover:opacity-80 transition-opacity duration-200 text-start group"
            >
              <img
                src={featuredNoticias[0].img}
                alt={featuredNoticias[0].titulo}
                className="w-full h-48 object-cover rounded-md shadow-sm group-hover:shadow-md transition-shadow duration-200"
              />
              <h2 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-blue-700 transition-colors duration-200">
                {featuredNoticias[0].titulo}
              </h2>
              <p className="text-sm text-gray-500">
                Por{" "}
                <span className="font-semibold">
                  {featuredNoticias[0].autor}
                </span>
              </p>
            </button>
          )}
          {featuredNoticias[1] && (
            <button
              onClick={() =>
                handleClick(
                  featuredNoticias[1].id_noticia,
                  featuredNoticias[1].titulo,
                )
              }
              className="hover:opacity-80 transition-opacity duration-200 text-start group"
            >
              <img
                src={featuredNoticias[1].img}
                alt={featuredNoticias[1].titulo}
                className="w-full h-48 object-cover rounded-md shadow-sm group-hover:shadow-md transition-shadow duration-200"
              />
              <h2 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-blue-700 transition-colors duration-200">
                {featuredNoticias[1].titulo}
              </h2>
              <p className="text-sm text-gray-500">
                Por{" "}
                <span className="font-semibold">
                  {featuredNoticias[1].autor}
                </span>
              </p>
            </button>
          )}
        </div>

        {/* Smaller Featured News - Bottom Row */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredNoticias[2] && (
            <button
              onClick={() =>
                handleClick(
                  featuredNoticias[2].id_noticia,
                  featuredNoticias[2].titulo,
                )
              }
              className="pr-0 md:pr-4 md:border-r md:border-gray-300 hover:opacity-80 transition-opacity duration-200 text-start group"
            >
              <img
                src={featuredNoticias[2].img}
                alt={featuredNoticias[2].titulo}
                className="w-full h-48 object-cover rounded-md shadow-sm group-hover:shadow-md transition-shadow duration-200"
              />
              <h2 className="text-lg font-bold text-gray-900 mt-2 group-hover:text-blue-700 transition-colors duration-200">
                {featuredNoticias[2].titulo}
              </h2>
              <p className="text-sm text-gray-500">
                Por{" "}
                <span className="font-semibold">
                  {featuredNoticias[2].autor}
                </span>
              </p>
            </button>
          )}
          {featuredNoticias[3] && (
            <button
              onClick={() =>
                handleClick(
                  featuredNoticias[3].id_noticia,
                  featuredNoticias[3].titulo,
                )
              }
              className="pr-0 md:pr-4 md:border-r md:border-gray-300 hover:opacity-80 transition-opacity duration-200 text-start group"
            >
              <img
                src={featuredNoticias[3].img}
                alt={featuredNoticias[3].titulo}
                className="w-full h-48 object-cover rounded-md shadow-sm group-hover:shadow-md transition-shadow duration-200"
              />
              <h2 className="text-lg font-bold text-gray-900 mt-2 group-hover:text-blue-700 transition-colors duration-200">
                {featuredNoticias[3].titulo}
              </h2>
              <p className="text-sm text-gray-500">
                Por{" "}
                <span className="font-semibold">
                  {featuredNoticias[3].autor}
                </span>
              </p>
            </button>
          )}
          {featuredNoticias[4] && (
            <button
              onClick={() =>
                handleClick(
                  featuredNoticias[4].id_noticia,
                  featuredNoticias[4].titulo,
                )
              }
              className="hover:opacity-80 transition-opacity duration-200 text-start group"
            >
              <img
                src={featuredNoticias[4].img}
                alt={featuredNoticias[4].titulo}
                className="w-full h-48 object-cover rounded-md shadow-sm group-hover:shadow-md transition-shadow duration-200"
              />
              <h2 className="text-lg font-bold text-gray-900 mt-2 group-hover:text-blue-700 transition-colors duration-200">
                {featuredNoticias[4].titulo}
              </h2>
              <p className="text-sm text-gray-500">
                Por{" "}
                <span className="font-semibold">
                  {featuredNoticias[4].autor}
                </span>
              </p>
            </button>
          )}
        </div>
      </section>

      {/* Ad Placeholder */}
      <div>
        <img src={publibaner} alt="Publicidad " />
      </div>

      {/* All Other News - Responsive Grid */}
      <section className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {noticia.slice(6).map((n) => (
            <button
              key={n.id_noticia}
              onClick={() => handleClick(n.id_noticia, n.titulo)}
              className="block w-full text-start hover:shadow-lg transition-shadow duration-300 border border-gray-200 rounded-lg bg-white overflow-hidden group"
            >
              <img
                src={n.img}
                alt={n.titulo}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-xl font-bold text-gray-800 leading-snug group-hover:text-gray-600 transition-colors duration-200">
                  {n.titulo}
                </h2>
                <p className="text-sm text-gray-600 italic">
                  Por <span className="font-semibold">{n.autor}</span>
                </p>
                <p className="text-base text-gray-700 line-clamp-4">
                  {n.resumen || "Descripción corta de la noticia..."}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NoticiaInicio;
