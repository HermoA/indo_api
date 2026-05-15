import useMensajeStore from "../store/MensajeStore";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion"; // Import motion from framer-motion

const ContactoPage = () => {
  const { addMensaje } = useMensajeStore();

  // Initial form values
  const initialValues = {
    nombre: "",
    correo: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    nombre: Yup.string()
      .trim() // Trim whitespace
      .required("El nombre es requerido"),
    correo: Yup.string()
      .email("Formato de correo inválido")
      .required("El correo es requerido"),
    telefono: Yup.string() // Changed to string for flexibility (e.g., allow + symbol, spaces)
      .matches(/^[0-9\s()+-]+$/, "Número de teléfono inválido") // Allows digits, spaces, parentheses, +,-
      .min(7, "El teléfono debe tener al menos 7 dígitos")
      .max(15, "El teléfono no debe exceder 15 dígitos")
      .required("El teléfono es requerido"),
    asunto: Yup.string().trim().required("El asunto es requerido"),
    mensaje: Yup.string()
      .trim()
      .min(10, "El mensaje debe tener al menos 10 caracteres")
      .required("El mensaje es requerido"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Ensure phone is a number if your backend expects it (parse if necessary)
    const mensajeData = {
      nombre: values.nombre,
      correo: values.correo,
      telefono: values.telefono, // Already validated as string in Yup
      asunto: values.asunto,
      mensaje: values.mensaje,
    };

    try {
      // Simulate API call delay for demonstration
      // await new Promise(resolve => setTimeout(resolve, 1500));
      const response = await addMensaje(mensajeData);
      console.log("✅ Mensaje enviado exitosamente:", response);
      alert(
        "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto."
      );
      resetForm();
    } catch (error) {
      console.error("❌ Error al enviar mensaje:", error);
      alert(
        "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Framer Motion Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.4 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0,0,0,0.3)" },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br sm:pt-32 pt-16 from-gray-900 via-black to-gray-950 text-gray-100 pb-12 font-sans">
      {/* Spacer div (can be replaced by padding-top on main container) */}
      {/* <div className="h-24"></div> */}

      <div className="container mx-auto px-4 lg:px-8">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-center mb-12 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Contáctanos y Trabaja con Nosotros
        </motion.h1>

        <motion.div
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Information Section */}
          <motion.div
            className="lg:w-1/2 bg-black bg-opacity-20  p-8 md:p-10 rounded-2xl shadow-xl border border-gray-500 space-y-6"
            variants={infoVariants}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-100 leading-snug">
              ¡Anuncia en Indoamérica La Radio!
            </h3>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              Si quieres conocer nuestras diferentes tarifas comerciales tanto
              para nuestra señal en FM, sitio web y redes sociales, contáctanos
              a través del formulario o directamente por los siguientes medios:
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <p className="font-semibold text-xl text-gray-100">
                  Mauricio Baspineiro
                </p>
                <p className="text-lg text-gray-400">
                  Área Comercial Indoamérica La Radio
                </p>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.041 0 01-4.148-1.047l-3.618 1.077a1 1 0 01-1.266-1.265l1.079-3.618A9 9 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM12.5 9.5a1 1 0 10-2 0V12a1 1 0 102 0v-2.5zM10 7a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-medium text-lg">Whatsapp:</p>
                <a
                  href="https://wa.me/59160483724"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-lg"
                >
                  +591 60483724
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.041 0 01-4.148-1.047l-3.618 1.077a1 1 0 01-1.266-1.265l1.079-3.618A9 9 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM12.5 9.5a1 1 0 10-2 0V12a1 1 0 102 0v-2.5zM10 7a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-medium text-lg">Whatsapp Radio:</p>
                <a
                  href="https://wa.me/59171811002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-lg"
                >
                  +591 64362904
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {/* Download Buttons 
              <motion.button
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Descarga Tarifas FM
              </motion.button>
              */}
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            className="lg:w-1/2 mx-auto w-full bg-black bg-opacity-20 p-8 md:p-10 rounded-2xl shadow-xl border border-gray-500"
            variants={formVariants}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-100">
              Envíanos un Mensaje
            </h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  {/* Nombre */}
                  <div>
                    <Field
                      type="text"
                      name="nombre"
                      placeholder="Tu Nombre Completo"
                      className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-100 placeholder-gray-500"
                    />
                    <ErrorMessage
                      name="nombre"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Correo */}
                  <div>
                    <Field
                      type="email"
                      name="correo"
                      placeholder="Tu Correo Electrónico"
                      className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-100 placeholder-gray-500"
                    />
                    <ErrorMessage
                      name="correo"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <Field
                      type="tel" // Use type="tel" for better mobile keyboard experience
                      name="telefono"
                      placeholder="Tu Número de Celular"
                      className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-100 placeholder-gray-500"
                    />
                    <ErrorMessage
                      name="telefono"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Asunto */}
                  <div>
                    <Field
                      type="text" // Changed type to "text" as "asunto" is not a standard HTML input type
                      name="asunto"
                      placeholder="Asunto del Mensaje"
                      className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-100 placeholder-gray-500"
                    />
                    <ErrorMessage
                      name="asunto"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Mensaje */}
                  <div>
                    <Field
                      as="textarea"
                      rows="6"
                      name="mensaje"
                      placeholder="Escribe tu mensaje aquí..."
                      className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 dark:text-100 placeholder-gray-500 resize-y"
                    />
                    <ErrorMessage
                      name="mensaje"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md transition duration-300 ease-in-out
                                 ${
                                   isSubmitting
                                     ? "opacity-60 cursor-not-allowed"
                                     : "hover:bg-blue-700 hover:shadow-lg"
                                 }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </motion.button>
                </Form>
              )}
            </Formik>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactoPage;
