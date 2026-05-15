import { Formik, Form, Field, ErrorMessage } from "formik";
import cancionStore from "../../store/CancionStore";
import * as Yup from "yup";


const CrearteSong = () => {
  const { createCancion } = cancionStore();

  const styletail =
    "w-full bg-black bg-opacity-30 placeholder:text-slate-400 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow";

  const initialValues = {
    titulo: "",
    artista: "",
    link: "",
  };

  const validationSchema = Yup.object({
    titulo: Yup.string().required("Requerido"),
    artista: Yup.string().required("Requerido"),
    link: Yup.string().required("Requerido"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const cancionData = {
      titulo: values.titulo,
      artista: values.artista,
      link: values.link,
    };

    try {
      const response = await createCancion(cancionData);
      console.log("✅ Respuesta:", response);
      resetForm();
    } catch (error) {
      console.error("❌ Error al crear canción:", error);
    }

    setSubmitting(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 text-white text-sm sm:text-base">
      <div className="mb-6 bg-black bg-opacity-20 p-4 rounded-lg shadow">
        <p className="mb-2 font-semibold text-indo_green">Pasos para agregar una canción:</p>
        <ol className="list-decimal list-inside space-y-1 text-slate-300">
          <li>
            Ve a{" "}
            <a
              href="https://open.spotify.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Spotify
            </a>
          </li>
          <li>Busca la canción que deseas agregar</li>
          <li>Copia el link de la canción</li>
          <li>Pega la parte del link marcada en rojo en el campo de &quot;Link&quot;</li>
          <li className="flex flex-wrap gap-1 items-center text-sm mt-2">
            <span className="text-slate-200">https://open.spotify.com/intl-es/track/</span>
            <span className="text-red-600 font-semibold break-all">0lP4HYLmvowOKdsQ7CVkuq</span>
            <span className="text-slate-400">?si=9b7a80275ca244c5</span>
          </li>
        </ol>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            {/* Título */}
            <div>
              <Field
                type="text"
                name="titulo"
                autocomplete="off"
                placeholder="Título de la canción"
                className={styletail}
              />
              <ErrorMessage name="titulo" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Artista */}
            <div>
              <Field
                type="text"
                name="artista"
                autocomplete="off"
                placeholder="Artista"
                className={styletail}
              />
              <ErrorMessage name="artista" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Link */}
            <div>
              <Field
                type="text"
                name="link"
                autocomplete="off"
                placeholder="ID del link de Spotify"
                className={styletail}
              />
              <ErrorMessage name="link" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Botón */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-black bg-opacity-30 text-slate-300 px-4 py-2 rounded hover:bg-opacity-50 transition duration-300 ease-in-out hover:text-indo_green ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Guardando..." : "Crear Canción"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CrearteSong;
