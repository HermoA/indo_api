import { Formik, Form, Field, ErrorMessage } from "formik";
import rankingStore from "../../store/RankingStore";
import { useEffect } from "react";

const UpdateRanking = () => {
  const { updateRanking, ranking, rankinNombre, nombre } = rankingStore();

  useEffect(() => {
    rankinNombre();
  }, [rankinNombre]);

  if (!ranking) {
    return <div className="text-white">Cargando...</div>;
  }

  const initialValues = {
    nombre: nombre.nombre,
    descripcion: nombre.descripcion,
  };

  const handleSubmit = (values, { resetForm }) => {
    updateRanking(nombre.id_ranking, values);
    resetForm();
  };

  return (
    <div>
      <div className="flex justify-center px-4 py-8 text-white">
        <div className="w-full max-w-4xl bg-black/40 rounded-2xl shadow-xl p-6 space-y-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Actualizar Ranking
          </h2>
          {/* Formulario */}
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block mb-1 font-semibold">
                    Nombre del Ranking
                  </label>
                  <Field
                    type="text"
                    name="nombre"
                    id="nombre"
                    className="w-full bg-black/30 placeholder:text-slate-400 
                             text-sm border border-slate-600 rounded-lg px-3 py-2 
                             focus:outline-none focus:border-indo_green"
                    placeholder="Ej: Ranking Rock 2025"
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="descripcion"
                    className="block mb-1 font-semibold"
                  >
                    Descripción
                  </label>
                  <Field
                    as="textarea"
                    name="descripcion"
                    id="descripcion"
                    className="w-full bg-black/30 placeholder:text-slate-400
                              text-sm border border-slate-600 rounded-lg px-3 py-2
                              focus:outline-none focus:border-indo_green"
                    placeholder="Describe el objetivo del ranking..."
                    rows="3"
                  />
                  <ErrorMessage
                    name="descripcion"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-indo_green hover:bg-green-600 text-white font-semibold 
                             py-2 px-6 rounded-lg transition duration-300"
                    disabled={isSubmitting}
                  >
                    Actualizar Ranking
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateRanking;
