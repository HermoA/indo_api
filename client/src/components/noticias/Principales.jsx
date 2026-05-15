import { useEffect } from "react";
import useNoticiaStore from "../../store/NoticiaStore";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useNavigate } from "react-router-dom";
import indonews from "../../assets/INDO-NEWS.png";

const Principales = () => {
  const { noticia, verNoticias, loading } = useNoticiaStore();

  const navigate = useNavigate();

  useEffect(() => {
    verNoticias();
  }, [verNoticias]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!noticia || noticia.length === 0) {
    return <div>No hay noticias disponibles</div>;
  }
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

  return (
    <div className="w-full px-4 sm:px-0">
      <div className="w-9/12 mx-auto flex flex-row items-center justify-center gap-4 py-4">
        {/* Título de la sección 
        <h1 className="text-4xl py-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">
          INDONEWS
        </h1>
        */}
        <img src={indonews} alt="indo" className="w-52 py-8" />
      </div>
      <div className="lg:w-8/12 w-full px-2 mx-auto">
        {/* Sección de noticia principal */}
        {noticia[0] && (
          // ... (resto del código)

          <div className="bg-gray-900 rounded-xl shadow-2xl mb-12 md:flex relative overflow-hidden">
            {/* Imagen de fondo borrosa */}
            <img
              src={noticia[0].img}
              alt="Fondo de noticia"
              className="absolute inset-0 w-full h-full object-cover z-0 blur-2xl opacity-40"
            />
            {/* Overlay oscuro para la legibilidad del texto */}
            <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

            {/* Contenedor de la imagen principal - Elimina el overflow-hidden de este div */}
            <div className="md:w-1/2 rounded-xl md:rounded-l-xl md:rounded-t-none z-20 p-6">
              {/* El botón ahora contendrá la imagen y tendrá overflow-hidden */}
              <button
                onClick={() =>
                  handleClick(noticia[0].id_noticia, noticia[0].titulo)
                }
                className="block w-full h-full text-start rounded-lg relative overflow-hidden group" // Añade 'group' aquí
              >
                <img
                  src={noticia[0].img}
                  alt="Imagen de noticia principal"
                  // Aplica el hover al pasar el ratón por el 'group' (el botón)
                  className="w-full h-full object-cover rounded-lg shadow-lg transform transition-all ease-in-out duration-500 group-hover:scale-105 group-hover:shadow-xl"
                />
                {/* Sombra sutil en la imagen de la noticia principal */}
                <div className="absolute inset-0 rounded-lg shadow-inner shadow-black/50"></div>
              </button>
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-center z-20 text-white relative">
              <div className="flex items-center gap-2 pb-4 ">
                <p>{noticia[0].categoria}</p>
                <p className="text-indo_green">-</p>
                <p>{noticia[0].sub_categoria}</p>
              </div>
              <p className="text-xs sm:text-sm text-indo_green mb-2 tracking-wide uppercase">
                {dayjs(noticia[0].publicacion)
                  .locale("es")
                  .format("D [de] MMMM [de] YYYY")}
              </p>
              <h1 className="text-xl sm:text-4xl font-extrabold mb-4 leading-tight drop-shadow-md">
                {noticia[0].titulo}
              </h1>
              <p className="text-gray-300 text-base sm:text-lg mb-6 line-clamp-4">
                {noticia[0].lead}
              </p>
              <button
                onClick={() =>
                  handleClick(noticia[0].id_noticia, noticia[0].titulo)
                }
                className="bg-gradient-to-r from-indo_green to-green-600 hover:from-green-600 hover:to-indo_green text-white font-bold py-3 px-8 rounded-full shadow-lg self-start transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="mr-2">☰</span> Leer Noticia
              </button>
            </div>
          </div>
        )}

        {/* Grid for Smaller Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Smaller Article 1 */}
          {noticia[1] && (
            <div className="relative sm:h-72 h-60 rounded-xl shadow-lg overflow-hidden flex justify-center items-end group">
              <img
                src={noticia[1].img}
                alt="Imagen de noticia pequeña 1"
                className="absolute inset-0 w-full h-full object-cover z-10 filter brightness-50 group-hover:scale-105 transition-all ease-in-out duration-500"
              />
              {/* Overlay para el contenido del texto */}
              <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-20 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 sm:pb-4 pb-1 text-white ">
                  <p>{noticia[1].categoria}</p>
                  <p className="text-indo_green">-</p>
                  <p>{noticia[1].sub_categoria}</p>
                </div>
                <h2 className="sm:text-xl text-base font-bold mb-2 text-white drop-shadow-lg leading-tight line-clamp-3">
                  {noticia[1].titulo}
                </h2>
                <p className="text-sm text-gray-200 mb-1">
                  {dayjs(noticia[1].publicacion)
                    .locale("es")
                    .format("DD MMM YYYY")}
                </p>
                <p className="text-xs text-gray-300 mb-4 line-clamp-1">
                  {noticia[1].autor}
                </p>
                <button
                  onClick={() =>
                    handleClick(noticia[1].id_noticia, noticia[1].titulo)
                  }
                  className="bg-gradient-to-r from-indo_green to-green-600 hover:from-green-600 hover:to-indo_green text-white font-semibold py-2 px-5 rounded-full text-sm self-start transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  Ver Noticia
                </button>
              </div>
            </div>
          )}

          {/* Smaller Article 2 */}
          {noticia[2] && (
            <div className="relative sm:h-72 h-60 rounded-xl shadow-lg overflow-hidden flex justify-center items-end group">
              <img
                src={noticia[2].img}
                alt="Imagen de noticia pequeña 2"
                className="absolute inset-0 w-full h-full object-cover z-10 filter brightness-50 group-hover:scale-105 transition-all ease-in-out duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-20 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 sm:pb-4 pb-1 text-white ">
                  <p>{noticia[2].categoria}</p>
                  <p className="text-indo_green">-</p>
                  <p>{noticia[2].sub_categoria}</p>
                </div>
                <h2 className="sm:text-xl text-base font-bold mb-2 text-white drop-shadow-lg leading-tight line-clamp-3">
                  {noticia[2].titulo}
                </h2>
                <p className="text-sm text-gray-200 mb-1">
                  {dayjs(noticia[2].publicacion)
                    .locale("es")
                    .format("DD MMM YYYY")}
                </p>
                <p className="text-xs text-gray-300 mb-4 line-clamp-1">
                  {noticia[2].autor}
                </p>
                <button
                  onClick={() =>
                    handleClick(noticia[2].id_noticia, noticia[2].titulo)
                  }
                  className="bg-gradient-to-r from-indo_green to-green-600 hover:from-green-600 hover:to-indo_green text-white font-semibold py-2 px-5 rounded-full text-sm self-start transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  Ver Noticia
                </button>
              </div>
            </div>
          )}

          {/* Smaller Article 3 */}
          {noticia[3] && (
            <div className="relative sm:h-72 h-60 rounded-xl shadow-lg overflow-hidden flex justify-center items-end group">
              <img
                src={noticia[3].img}
                alt="Imagen de noticia pequeña 3"
                className="absolute inset-0 w-full h-full object-cover z-10 filter brightness-50 group-hover:scale-105 transition-all ease-in-out duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-20 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 sm:pb-4 pb-1 text-white ">
                  <p>{noticia[3].categoria}</p>
                  <p className="text-indo_green">-</p>
                  <p>{noticia[3].sub_categoria}</p>
                </div>
                <h2 className="sm:text-xl text-base font-bold mb-2 text-white drop-shadow-lg leading-tight line-clamp-3">
                  {noticia[3].titulo}
                </h2>
                <p className="text-sm text-gray-200 mb-1">
                  {dayjs(noticia[3].publicacion)
                    .locale("es")
                    .format("DD MMM YYYY")}
                </p>
                <p className="text-xs text-gray-300 mb-4 line-clamp-1">
                  {noticia[3].autor}
                </p>
                <button
                  onClick={() =>
                    handleClick(noticia[3].id_noticia, noticia[3].titulo)
                  }
                  className="bg-gradient-to-r from-indo_green to-green-600 hover:from-green-600 hover:to-indo_green text-white font-semibold py-2 px-5 rounded-full text-sm self-start transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  Ver Noticia
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Principales;
