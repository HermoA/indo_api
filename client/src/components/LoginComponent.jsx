import { Formik, Form } from "formik";
import useAuthStore from "../store/LoginStore";
import ImputComponent from "../components/ImputComponent";
import BotonComponent from "../components/BotonComponent";
//import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const { login } = useAuthStore();

  //const navigate = useNavigate(); // Hook para redirigir
  return (
    <div className="flex h-screen sm:h-min bg-black sm:bg-opacity-80 justify-center items-center p-8 z-40 text-base">
      <Formik
        initialValues={{ nombre: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const res = await login(values); // <-- importante el await

            if (res.success) {
              console.log("Login exitoso");
              // Redirigir o hacer lo que necesites
              window.location.href = "/";
            } else {
              alert("Credenciales no válidos " + res.message);
            }
          } catch (error) {
            console.error("Error al intentar login:", error);
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="rounded-lg flex flex-col items-center justify-center gap-5"
          >
            <h3 className="text-white text-lg font-roboto w-full text-center ">
              {" "}
              Introduzca sus datos
            </h3>
            <ImputComponent
              type="text"
              placeholder="Nombre de usuario"
              name="nombre"
              id="nombre"
              onChange={handleChange}
            />
            <ImputComponent
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
            />
            <BotonComponent texto="Iniciar Sesion" />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginComponent;
