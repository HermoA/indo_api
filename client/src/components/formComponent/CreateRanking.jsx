import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import rankingStore from "../../store/RankingStore";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdMusicalNote } from "react-icons/io";
import { useEffect } from "react";

const CreateRanking = () => {
  const {
    createRanking,
    rankinCanciones,
    rankinCancionesNull,
    ranking,
    cancionesnull,
    rankinNombre,
    nombre,
    editCancion,
  } = rankingStore();

  const initialValues = {
    nombre: "",
    descripcion: "",
  };
  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    descripcion: Yup.string().required("La descripción es obligatoria"),
  });
  const handleSubmit = (values, { resetForm }) => {
    const rankingData = {
      nombre: values.nombre,
      descripcion: values.descripcion,
    };
    createRanking(rankingData);
    resetForm();
  };

  useEffect(() => {
    rankinCancionesNull();
    rankinCanciones();
    rankinNombre();
  }, [rankinCancionesNull, rankinCanciones, rankinNombre]);

  return (
    <div className="">
      <div className="w-full mx-auto px-4 py-6 text-white text-sm sm:text-base">
        {/* Título principal */}
        <h2 className="text-3xl font-extrabold mb-6 text-center">
          Crear Nuevo Ranking
        </h2>

        <div className="mb-6 bg-black bg-opacity-30 p-6 rounded-xl shadow-lg border border-gray-800">
          {/* Formulario */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block mb-1 font-semibold text-gray-200"
                  >
                    Nombre del Ranking
                  </label>
                  <Field
                    type="text"
                    name="nombre"
                    id="nombre"
                    className="w-full bg-black/40 text-white placeholder:text-gray-500 
                           text-sm border border-gray-600 rounded-lg px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-indo_green"
                    placeholder="Ej: Ranking Rock 2025"
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="text-red-400 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="descripcion"
                    className="block mb-1 font-semibold text-gray-200"
                  >
                    Descripción
                  </label>
                  <Field
                    as="textarea"
                    name="descripcion"
                    id="descripcion"
                    className="w-full bg-black/40 text-white placeholder:text-gray-500 
                           text-sm border border-gray-600 rounded-lg px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-indo_green"
                    placeholder="Describe el objetivo del ranking..."
                    rows="3"
                  />
                  <ErrorMessage
                    name="descripcion"
                    component="div"
                    className="text-red-400 text-xs mt-1"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-indo_green hover:bg-green-600 text-white 
                           px-5 py-2 rounded-lg font-semibold 
                           transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                        Creando...
                      </>
                    ) : (
                      "Crear Ranking"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {/* Canciones */}
          <h3 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
            <IoMdMusicalNote /> Agrega tus canciones al ranking
          </h3>
          <div className="flex flex-col sm:flex-row mt-6 gap-6">
            {/* Canciones disponibles */}
            <div className="w-full sm:w-1/2 bg-black/30 p-4 rounded-lg shadow-md h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 hover:shadow-lg transition">
              <h4 className="text-lg font-bold mb-3">Disponibles</h4>
              {cancionesnull.length > 0 ? (
                cancionesnull.map((cancion) => (
                  <div
                    key={cancion.id_cancione}
                    className="flex justify-between items-center bg-black/40 p-3 
                           rounded-lg mb-2 hover:bg-black/60 transition"
                  >
                    <span className="truncate">
                      {cancion.titulo} - {cancion.artista}
                    </span>
                    <button
                      onClick={() =>
                        editCancion(cancion.id_cancione, {
                          id_ranking: nombre.id_ranking,
                        })
                      }
                      className="bg-indo_green hover:bg-green-600 flex items-center gap-1 
                             text-white text-xs px-3 py-1.5 rounded-md transition"
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No hay canciones libres</p>
              )}
            </div>

            {/* Canciones en el ranking */}
            <div className="w-full sm:w-1/2 bg-black/30 p-4 rounded-lg shadow-md h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 hover:shadow-lg transition">
              <h4 className="text-lg font-bold mb-3">En el Ranking</h4>
              {ranking.length > 0 ? (
                ranking.map((rank) => (
                  <div
                    key={rank.id_ranking}
                    className="flex justify-between items-center bg-black/40 p-3 
                           rounded-lg mb-2 hover:bg-black/60 transition"
                  >
                    <span className="truncate">
                      {rank.titulo} - {rank.artista}
                    </span>
                    <button
                      onClick={() =>
                        editCancion(rank.id_cancione, { id_ranking: null })
                      }
                      className="bg-red-600 hover:bg-red-700 flex items-center gap-1 
                             text-white text-xs px-3 py-1.5 rounded-md transition"
                    >
                      <FaArrowLeft />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">
                  Aún no agregaste canciones
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRanking;
