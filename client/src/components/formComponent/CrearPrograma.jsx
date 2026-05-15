import { Formik, Form, Field, ErrorMessage } from "formik";
import programaStore from "../../store/programaStore";
import * as Yup from "yup";
import { useState } from "react";

const CrearPrograma = () => {
  const { createPrograma } = programaStore();
  const id_usuario_programas = localStorage.getItem("id");
  const diasSemana = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleCheckboxChange = (dia) => {
    setDiasSeleccionados((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const styletail =
    "w-full bg-black bg-opacity-30 placeholder:text-slate-400 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow";

  const initialValues = {
    nombre_programa: "",
    id_usuario_programas: "",
    conductor: "",
    descripcion: "",
    dias: "",
    horario_in: "",
    horario_out: "",
    logo_programa: null,
  };

  const validationSchema = Yup.object({
    nombre_programa: Yup.string().required("Requerido"),
    conductor: Yup.string().required("Requerido"),
    descripcion: Yup.string().required("Requerido"),
    horario_in: Yup.string().required("Requerido"),
    horario_out: Yup.string().required("Requerido"),
    logo_programa: Yup.mixed().required("Selecciona una imagen"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const programaData = {
      nombre_programa: values.nombre_programa,
      conductor: values.conductor,
      descripcion: values.descripcion,
      dias: diasSeleccionados.join("- "),
      horario_in: values.horario_in,
      horario_out: values.horario_out,
      id_usuario_programas,
    };

    try {
      const response = await createPrograma(programaData, values.logo_programa);
      console.log("✅ Respuesta:", response);
      resetForm();
      setDiasSeleccionados([]);
      setSelectedFileName("");
    } catch (error) {
      console.error("❌ Error al crear programa:", error);
    }

    setSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna 1 */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm">Nombre del Programa</label>
                <Field
                  name="nombre_programa"
                  autocomplete="off"
                  placeholder="Nombre Programa"
                  className={styletail}
                />
                <ErrorMessage
                  name="nombre_programa"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="text-sm">Conductor</label>
                <Field
                  name="conductor"
                  autocomplete="off"
                  placeholder="Conductor"
                  className={styletail}
                />
                <ErrorMessage
                  name="conductor"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="text-sm">Hora de inicio</label>
                <Field
                  type="time"
                  autocomplete="off"
                  name="horario_in"
                  className={styletail}
                />
                <ErrorMessage
                  name="horario_in"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="text-sm">Hora de finalización</label>
                <Field
                  type="time"
                  autocomplete="off"
                  name="horario_out"
                  className={styletail}
                />
                <ErrorMessage
                  name="horario_out"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>

            {/* Columna 2 */}
            <div className="flex flex-col gap-4">
              <fieldset>
                <legend className="text-sm font-semibold mb-2">
                  Días de transmisión
                </legend>
                <div className="flex flex-wrap gap-2">
                  {diasSemana.map((dia) => (
                    <label
                      key={dia}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        name="dias"
                        checked={diasSeleccionados.includes(dia)}
                        onChange={() => handleCheckboxChange(dia)}
                      />
                      <span>{dia}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label className="text-sm">Logo del programa</label>
                <input
                  name="logo_programa"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("logo_programa", file);
                    setSelectedFileName(file ? file.name : "");
                  }}
                  className={styletail}
                />
                {selectedFileName && (
                  <p className="text-xs text-slate-400 mt-1 truncate">
                    {selectedFileName}
                  </p>
                )}
                <ErrorMessage
                  name="logo_programa"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="text-sm">Descripción</label>
                <Field
                  as="textarea"
                  name="descripcion"
                  autocomplete="off"
                  rows="3"
                  placeholder="Descripción del programa"
                  className={styletail}
                />
                <ErrorMessage
                  name="descripcion"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>

            {/* Botón */}
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black bg-opacity-30 text-slate-400 px-6 py-2 rounded hover:bg-opacity-50 hover:text-white transition duration-300"
              >
                {isSubmitting ? "Enviando..." : "Crear Programa"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CrearPrograma;
