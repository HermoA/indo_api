import { createMensaje } from "../../api/mensaje.api";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Formulario = () => {
  const initialValues = {
    nombre: "",
    correo: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  };
  const validationSchema = Yup.object({
    nombre: Yup.string().required("Requerido"),
    correo: Yup.email().required("Requerido"),
    telefono: Yup.number().required("Requerido"),
    asunto: Yup.string().required("Requerido"),
    mensaje: Yup.string().required("Requerido"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const mensajeData = {
      nombre: values.nomre,
      correo: values.correo,
      telefono: values.telefono,
      asunto: values.asunto,
      mensaje: values.mensaje,
    };
    try {
      const response = await createMensaje(mensajeData);
      console.log(response);
      resetForm();
    } catch (error) {
      console.error("❌ Error al enviar mesaje:", error);
    }

    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <div>
                <Field name="nombre" placeholder="Nombre" />
                <ErrorMessage
                  name="nombre"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field name="correo" placeholder="Correo" />
                <ErrorMessage
                  name="correo"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field type="number" name="telefono" placeholder="Telefono" />
                <ErrorMessage
                  name="telefono"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field type="asunto" name="telefono" placeholder="Asunto" />
                <ErrorMessage
                  name="asunto"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field
                  as="textarea"
                  rows="10"
                  name="mensaje"
                  placeholder="Mensaje"
                />
                <ErrorMessage
                  name="mensaje"
                  component="div"
                  className="text-red-600"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black bg-opacity-30 text-slate-400 px-4 py-2 rounded hover:bg-opacity-50 transition duration-300 ease-in-out hover:text-indo_green"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Formulario;
