import { Formik, Form } from "formik";
import { createUser } from "../api/usuario.api";
import ImputComponent from "./ImputComponent";
import BotonComponent from "./BotonComponent";
//import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function RegisterComponent() {
  //const navigate = useNavigate(); // Hook para redirigir
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
    } else {
      setError("");
    }
  }, [password, confirmPassword]);

  return (
    <div className="h-screen sm:h-min bg-black sm:bg-opacity-80 p-10 flex justify-center items-center z-40 text-base">
      <Formik
        initialValues={{ nombre: "", password: "", email: "" }}
        onSubmit={async (values) => {          
          try {
            const response = await createUser(values);

            if (response.success) {
              alert( "registrado correctamente");              
            } else {
              alert(response.message);
            }           
            window.location.href = "/";
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="rounded-lg flex flex-col items-center justify-center gap-5"
          >
            <h3 className="text-white text-xl font-roboto w-full text-center ">
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
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              onChange={handleChange}
            />
            <ImputComponent
              type="password"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleChange(e);
              }}
            />

            <ImputComponent
              type="password"
              placeholder="Confirmar Contraseña"
              name=""
              value={confirmPassword}
              id="confirmPassword"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                handleChange(e);
              }}
            />
            {error && <p className="text-red-500">{error}</p>}
            <BotonComponent
              texto="Registrate"
              disabled={error || !password || !confirmPassword}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterComponent;
