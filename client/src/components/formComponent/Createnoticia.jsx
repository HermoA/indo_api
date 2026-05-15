import { Formik, Form, Field, ErrorMessage } from "formik";
import noticiaStore from "../../store/NoticiaStore";
import * as Yup from "yup";

const Createnoticia = () => {
  const { addNoticia } = noticiaStore();
  const id_usuario_noticia = localStorage.getItem("id");

  const styletail =
    "w-full bg-black bg-opacity-30 placeholder:text-slate-400 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow";

  const initialValues = {
    titulo: "",
    lead: "",
    categoria: "",
    sub_categoria: "",
    id_usuario_noticia: "",
    autor: "",
    cuerpo: "",
    publicacion: "",
    img: null,
  };

  const validationSchema = Yup.object({
    titulo: Yup.string().required("Requerido"),
    lead: Yup.string(),
    autor: Yup.string().required("Requerido"),
    categoria: Yup.string().required("Requerido"),
    sub_categoria: Yup.string(),
    cuerpo: Yup.string(),
    publicacion: Yup.string().required("Requerido"),
    img: Yup.mixed().required("Selecciona una imagen"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const noticiaData = {
      titulo: values.titulo,
      lead: values.lead,
      categoria: values.categoria,
      sub_categoria: values.sub_categoria,
      autor: values.autor,
      cuerpo: values.cuerpo,
      publicacion: values.publicacion,
      id_usuario_noticia,
    };

    const file = values.img;

    try {
      const response = await addNoticia(noticiaData, file);
      console.log("✅ Respuesta:", response);
      resetForm();
    } catch (error) {
      console.error("❌ Error al crear noticia:", error);
    }

    setSubmitting(false);
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Título */}
            <div>
              <label className="block mb-1 text-sm">Título</label>
              <Field
                type="text"
                name="titulo"
                autocomplete="off"
                placeholder="Título"
                className={styletail}
              />
              <ErrorMessage
                name="titulo"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Autor */}
            <div>
              <label className="block mb-1 text-sm">Fuente / Autor</label>
              <Field
                type="text"
                name="autor"
                autocomplete="off"
                placeholder="Autor"
                className={styletail}
              />
              <ErrorMessage
                name="autor"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Lead */}
            <div className="md:col-span-2">
              <label className="block mb-1 text-sm">Lead</label>
              <Field
                as="textarea"
                rows="4"
                name="lead"
                autocomplete="off"
                placeholder="Lead"
                className={styletail}
              />
              <ErrorMessage
                name="lead"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Fecha publicación */}
            <div>
              <label className="block mb-1 text-sm">Fecha de publicación</label>
              <Field
                type="date"
                name="publicacion"
                autocomplete="off"
                className={styletail}
              />
              <ErrorMessage
                name="publicacion"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Categoría */}
            <div>
              <label className="block mb-1 text-sm">Categoría</label>
              <Field as="select" name="categoria" className={styletail}>
                <option value="">Selecciona una categoría</option>
                <option value="Local">Local</option>
                <option value="Nacional">Nacional</option>
                <option value="Mundo">Mundo</option>
                <option value="Musica">Música</option>
                <option value="Espectaculos">Espectáculos</option>
                <option value="Entretenimiento">Entretenimiento</option>
                <option value="Cultura">Cultura</option>
                <option value="Deportes">Deportes</option>
              </Field>
              <ErrorMessage
                name="categoria"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            {/* Subcategoría libre eleccion */}
            <div>
              <label className="block mb-1 text-sm">Subcategoría</label>
              <Field
                type="text"
                name="sub_categoria"
                autocomplete="off"
                placeholder="Subcategoría (opcional)"
                className={styletail}
              />
              <ErrorMessage
                name="sub_categoria"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Imagen */}
            <div className="md:col-span-2">
              <label className="block mb-1 text-sm">Imagen destacada</label>
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={(event) =>
                  setFieldValue("img", event.currentTarget.files[0])
                }
                className={styletail}
              />
              <ErrorMessage
                name="img"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Cuerpo */}
            <div className="md:col-span-2">
              <label className="block mb-1 text-sm">Cuerpo de la noticia</label>
              <Field
                as="textarea"
                rows="10"
                name="cuerpo"
                autocomplete="off"
                placeholder="Cuerpo"
                className={styletail}
              />
              <ErrorMessage
                name="cuerpo"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            {/* Botón */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-black bg-opacity-30 text-slate-400 px-6 py-2 rounded hover:bg-opacity-50 hover:text-indo_green transition ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Creando..." : "Crear Noticia"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Createnoticia;
