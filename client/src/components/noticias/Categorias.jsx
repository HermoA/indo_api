import { useEffect, useState } from "react";
import useNoticiaStore from "../../store/NoticiaStore";
import { getDolar } from "../../api/dolar";
import { useNavigate } from "react-router-dom";
import publibaner from "../../assets/publiBanner.jpeg";

// Removed prop-types linting disable as it's better to add proper prop-types validation or use TypeScript
// import PropTypes from 'prop-types'; // If you want to use prop-types

// eslint-disable-next-line react/prop-types
const Categorias = ({ tipo }) => {
  const { noticias, VerCategoria, loading } = useNoticiaStore();
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
    // Fetches news for the specific category
    VerCategoria(tipo);

    // Fetches dollar data
    const fetchDolar = async () => {
      try {
        const response = await getDolar();
        setDolar(response);
      } catch (error) {
        console.error("Error fetching dollar data:", error);
      }
    };
    fetchDolar();
  }, [VerCategoria, tipo]); // Dependencies ensure data refetches when category 'tipo' changes or VerCategoria updates

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-semibold">
        Cargando noticias de {tipo}...
      </div>
    );
  }

  // Check if noticias is available and has items before trying to access indices
  if (!noticias || noticias.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-semibold text-gray-600">
        No hay noticias disponibles para la categoría {tipo}.
      </div>
    );
  }

  // Slice news for main and featured sections only if enough news items exist
  const mainNoticia = noticias[0];
  const featuredNoticias = noticias.slice(1, 3); // Get the next 3 for the featured section

  return (
    <div className="flex flex-col items-center justify-center gap-6 font">
      {/* Header Section */}
      <header className="w-full border-b border-gray-300 py-4 text-center">
        <h1 className="text-4xl font-poppins md:text-5xl font-bold text-gray-900 tracking-tight">
          {tipo} Noticias
        </h1>
      </header>

      {/* Dolar Information */}
      {dolar && dolar.length > 0 && (
        <section className="w-11/12 md:w-8/12 lg:w-7/12 flex flex-col md:flex-row gap-2 p-4 border-b border-gray-300 bg-gray-50 rounded-lg shadow-sm">
          <p className="text-md md:text-lg text-gray-700">
            <span className="font-semibold">Dólar Oficial Compra:</span>{" "}
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

      {/* Main Category News Grid */}
      {mainNoticia && ( // Only render this section if there's at least one main news item
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 md:w-8/12 lg:w-7/12 p-4 border-b border-gray-300">
          {/* Featured Main News (first item) */}
          <button
            onClick={() =>
              handleClick(mainNoticia.id_noticia, mainNoticia.titulo)
            }
            className="md:col-span-2 row-span-3 pr-0 md:pr-4 md:border-r md:border-gray-300 hover:opacity-80 transition-opacity duration-200 text-start flex flex-col gap-2 group"
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

          {/* Smaller Featured News (next 3 items) */}
          <div className="flex flex-col gap-6">
            {featuredNoticias.map((n, index) => (
              <button
                key={n.id_noticia}
                onClick={() => handleClick(n.id_noticia, n.titulo)}
                className={`hover:opacity-80 transition-opacity duration-200 text-start group ${
                  index < featuredNoticias.length - 1
                    ? "pb-4 border-b border-gray-300"
                    : ""
                }`}
              >
                <img
                  src={n.img}
                  alt={n.titulo}
                  className="w-full h-48 object-cover rounded-md shadow-sm group-hover:shadow-md transition-shadow duration-200"
                />
                <h2 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-blue-700 transition-colors duration-200">
                  {n.titulo}
                </h2>
                <p className="text-sm text-gray-500">
                  Por <span className="font-semibold">{n.autor}</span>
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Ad Placeholder */}
      <div>
        <img src={publibaner} alt="Publicidad " />
      </div>

      {/* All Other News for the Category - Responsive Grid */}
      {noticias.length > 3 && ( // Only render if there are more news items beyond the featured ones
        <section className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {noticias.slice(3).map((n) => (
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
                  <h2 className="text-xl font-bold text-gray-800 leading-snug group-hover:text-blue-700 transition-colors duration-200">
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
      )}
    </div>
  );
};

// If you want to use prop-types, uncomment the import at the top and this section
// Categorias.propTypes = {
//   tipo: PropTypes.string.isRequired,
// };

export default Categorias;
