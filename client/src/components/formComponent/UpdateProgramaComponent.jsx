import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updatePrograma } from "../../api/programa.api";
import programaStore from "../../store/ProgramaStore";

// eslint-disable-next-line react/prop-types
const UpdateProgramaComponent = ({ id }) => {
  const { verPrograma, deleteImagePrograma, uploadImagePrograma } =
    programaStore();
  const [programa, setPrograma] = useState(null);
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const diasSemana = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

  useEffect(() => {
    const fetchPrograma = async () => {
      const res = await verPrograma(id);
      setPrograma(res);
      if (res?.dias) {
        setDiasSeleccionados(res.dias.split("- ").filter(Boolean));
      }
    };
    if (id) fetchPrograma();
  }, [id, verPrograma]);

  const handleCheckboxChange = (dia) => {
    setDiasSeleccionados((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const styletail =
    "w-full bg-black bg-opacity-30 placeholder:text-slate-400 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow";

  const initialValues = {
    nombre_programa: programa?.nombre_programa || "",
    conductor: programa?.conductor || "",
    descripcion: programa?.descripcion || "",
    horario_in: programa?.horario_in || "",
    horario_out: programa?.horario_out || "",
    dias: diasSeleccionados,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const dataToUpdate = {
      nombre_programa: values.nombre_programa,
      conductor: values.conductor,
      descripcion: values.descripcion,
      horario_in: values.horario_in,
      horario_out: values.horario_out,
      dias: diasSeleccionados.join("- "),
    };

    try {
      const res = await updatePrograma(id, dataToUpdate);
      console.log("✅ Actualizado:", res);
    } catch (error) {
      console.error("❌ Error al actualizar:", error);
    }

    setSubmitting(false);
  };
  const logoUrl = programa?.logo_programa;

  const fileName = logoUrl ? logoUrl.split("/").pop() : null;

  if (!programa)
    return <p className="text-center text-gray-400">Cargando programa...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border border-slate-200 p-4 rounded-md shadow-md max-w-5xl mx-auto">
      {/* Imagen */}
      {programa.logo_programa ? (
        <div className="md:col-span-1">
          <img
            src={programa.logo_programa}
            alt="Logo Programa"
            className="w-full rounded-md shadow"
          />
          <h3 className="mt-4 font-semibold">Nombre del archivo:</h3>
          <p>{fileName}</p>
          <button className=" mt-4 text-sm text-white bg-black bg-opacity-20 p-2 rounded-lg hover:bg-red-600 hover:underline">
            <span
              onClick={async () => {
                try {
                  await deleteImagePrograma(id);
                  setPrograma((prev) => ({ ...prev, logo_programa: null }));
                  console.log("Imagen eliminada");
                } catch (error) {
                  console.error("Error al eliminar imagen:", error);
                }
              }}
            >
              Eliminar Imagen
            </span>
          </button>
        </div>
      ) : (
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Subir Logo del Programa
          </label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                try {
                  const res = await uploadImagePrograma(id, file);
                  setPrograma((prev) => ({
                    ...prev,
                    logo_programa: res.logo_programa,
                  }));
                  console.log("Imagen subida:", res);
                } catch (error) {
                  console.error("Error al subir imagen:", error);
                }
              }
            }}
          />
        </div>
      )}

      {/* Formulario */}
      <div className="md:col-span-3">
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Columna 1 */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm">Nombre del programa</label>
                  <Field name="nombre_programa" className={styletail} />
                  <ErrorMessage
                    name="nombre_programa"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div>
                  <label className="text-sm">Conductor</label>
                  <Field name="conductor" className={styletail} />
                  <ErrorMessage
                    name="conductor"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div>
                  <label className="text-sm">Hora de inicio</label>
                  <Field type="time" name="horario_in" className={styletail} />
                  <ErrorMessage
                    name="horario_in"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div>
                  <label className="text-sm">Hora de finalización</label>
                  <Field type="time" name="horario_out" className={styletail} />
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
                        className="flex items-center gap-2 text-sm"
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
                  <label className="text-sm">Descripción</label>
                  <Field
                    as="textarea"
                    name="descripcion"
                    rows="4"
                    className={styletail}
                    placeholder="Descripción del programa"
                  />
                  <ErrorMessage
                    name="descripcion"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>

              {/* Botón Submit */}
              <div className="md:col-span-2 flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black bg-opacity-30 text-slate-400 px-6 py-2 rounded hover:bg-opacity-50 hover:text-white transition duration-300"
                >
                  {isSubmitting ? "Actualizando..." : "Actualizar Programa"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateProgramaComponent;
