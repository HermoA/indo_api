import { useEffect, useState } from "react";
import useNoticiaStore from "../../store/NoticiaStore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import dayjs from "dayjs";

// eslint-disable-next-line react/prop-types
const UpdateNoticias = ({ id }) => {
  const { updateNoticia, verNoticia, deleteImgNoticia, updateImgNoticia } =
    useNoticiaStore();

  const [noticia, setNoticia] = useState({
    id_noticia: "",
    titulo: "",
    lead: "",
    categoria: "",
    sub_categoria: "",
    autor: "",
    cuerpo: "",
    publicacion: "",
    img: "",
  });

  const styletail =
    "w-full bg-black bg-opacity-30 placeholder:text-slate-400 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow";

  const initialValues = {
    titulo: noticia.titulo,
    lead: noticia.lead,
    categoria: noticia.categoria,
    sub_categoria: noticia.sub_categoria,
    autor: noticia.autor,
    cuerpo: noticia.cuerpo,
    publicacion: noticia.publicacion,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const noticiaData = { ...values };

    try {
      const response = await updateNoticia(id, noticiaData);
      console.log("✅ Noticia actualizada:", response);
      resetForm();
    } catch (error) {
      console.error("❌ Error al actualizar noticia:", error);
    }

    setSubmitting(false);
  };

  useEffect(() => {
    const fetchNoticia = async () => {
      const data = await verNoticia(id);
      setNoticia({
        ...data,
        publicacion: dayjs(data.publicacion).format("YYYY-MM-DD"),
      });
    };
    if (id) fetchNoticia();
  }, [id]);

  const handleDeleteImg = (id) => {
    if (window.confirm("¿Estás seguro de eliminar la imagen?")) {
      deleteImgNoticia(id);
    }
  };

  const handleUpdateImg = async (values, { setSubmitting }) => {
    const file = values.img;
    try {
      const response = await updateImgNoticia(id, file);
      console.log("✅ Imagen actualizada:", response);
    } catch (error) {
      console.error("❌ Error al actualizar imagen:", error);
    }
    setSubmitting(false);
  };

  if (!id) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border border-slate-200 p-6 rounded-md shadow-md">
      {/* IMAGEN Y FORMULARIO DE ACTUALIZACIÓN */}
      <div className="flex flex-col items-center gap-4">
        {noticia.img ? (
          <div className="w-full text-center">
            <img src={noticia.img} alt="Imagen noticia" className="w-full rounded-md mb-2" />
            <button
              onClick={() => handleDeleteImg(id)}
              className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Eliminar imagen
            </button>
          </div>
        ) : (
          <Formik initialValues={{ img: null }} onSubmit={handleUpdateImg}>
            {({ setFieldValue, isSubmitting }) => (
              <Form className="flex flex-col w-full gap-4">
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={(e) => setFieldValue("img", e.currentTarget.files[0])}
                  className={styletail}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black bg-opacity-30 text-slate-400 px-4 py-2 rounded hover:bg-opacity-50 hover:text-indo_green transition"
                >
                  {isSubmitting ? "Subiendo..." : "Actualizar Imagen"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>

      {/* FORMULARIO PRINCIPAL */}
      <div className="md:col-span-3">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm">Título</label>
                <Field name="titulo" className={styletail} />
                <ErrorMessage name="titulo" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label className="block mb-1 text-sm">Lead</label>
                <Field name="lead" className={styletail} />
                <ErrorMessage name="lead" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label className="block mb-1 text-sm">Autor</label>
                <Field name="autor" className={styletail} />
                <ErrorMessage name="autor" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label className="block mb-1 text-sm">Categoría</label>
                <Field as="select" name="categoria" className={styletail}>
                  <option value="">Selecciona categoría</option>
                  <option value="Local">Local</option>
                  <option value="Nacional">Nacional</option>
                  <option value="Mundo">Mundo</option>
                  <option value="Entretenimiento">Entretenimiento</option>
                  <option value="Cultura">Cultura</option>
                  <option value="Deportes">Deportes</option>
                </Field>
                <ErrorMessage name="categoria" component="div" className="text-red-600 text-sm" />
              </div>
              <div>
                <label className="block mb-1 text-sm">Sub categoria</label>
                <Field name="sub_categoria" className={styletail} />
                <ErrorMessage name="sub_categoria" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label className="block mb-1 text-sm">Fecha de publicación</label>
                <Field type="date" name="publicacion" className={styletail} />
                <ErrorMessage name="publicacion" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 text-sm">Cuerpo</label>
                <Field as="textarea" rows="10" name="cuerpo" className={styletail} />
                <ErrorMessage name="cuerpo" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="md:col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-black bg-opacity-30 text-slate-400 px-6 py-2 rounded hover:bg-opacity-50 hover:text-indo_green transition ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Guardando..." : "Actualizar Noticia"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateNoticias;
