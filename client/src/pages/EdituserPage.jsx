import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import listUsuarios from "../store/UserEstore";

const EdituserPage = () => {
  const { getUserById, user, updateUser } = listUsuarios();

  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchUser = async () => {
      await getUserById(id);
    };
    fetchUser();
  }, [id, getUserById]);
  console.log(user.nombre_usuario);

  const initialvalues = {
    nombre_usuario: user.nombre_usuario,
    email_usuario: user.email_usuario || "",
    password: user.password || "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const userData = {
      nombre_usuario: values.nombre,
      email_usuario: values.email,
    };
    if (values.password.trim() !== "") {
      userData.password = values.password;
    }
    console.log("📝 Datos del formulario:", userData);

    try {
      const response = await updateUser(id, userData);
      console.log("✅ Respuesta:", response);
      resetForm();
    } catch (error) {
      console.error("❌ Error al actualizar usuario:", error);
    }
    setSubmitting(false);
  };

  return (
    <div className="bg-[url('./assets/bg_2.jpg')] bg-cover bg-center min-h-screen">
      <div className="h-screen flex items-center justify-center">
        <div className="w-screen">
          <Formik
            initialValues={initialvalues}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col items-center justify-center text-white bg-black bg-opacity-30 rounded-lg shadow-md py-10 ">
                <h1 className="text-white text-3xl font-bold text-center pb-5 ">
                  Actualiza tus datos
                </h1>
                <div className="mb-4">
                  <Field
                    type="text"
                    name="nombre_usuario"
                    placeholder="Nombre"
                    className="w-full bg-black bg-opacity-30 placeholder:text-slate-400 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    type="email"
                    name="email_usuario"
                    placeholder="Email"
                    className="w-full bg-black bg-opacity-30 placeholder:text-slate-400 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="w-full bg-black bg-opacity-30 placeholder:text-slate-400 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-black bg-opacity-30 text-slate-400 px-4 py-2 rounded hover:bg-opacity-50 transition duration-300 ease-in-out hover:text-indo_green ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EdituserPage;
