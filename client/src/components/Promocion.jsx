import Vol from "../assets/Volume Control 3D Animated Icon.gif";
import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
function Promocion() {
  return (
    <div className="flex w-full flex-col lg:flex-row ">
      <div className="lg:w-1/3 w-56 m-auto">
        <img src={Vol} alt="vol" />
      </div>
      <div className="flex flex-col gap-6 lg:p-20 p-8 font-semibold text-lg text-white">
        <h3 className=" text-indo_green text-4xl font-bold">
          ¡Publicita con Nosotros y Haz Crecer tu Negocio!
        </h3>
        <p>
          Llega a miles de clientes potenciales a través de nuestra plataforma.
        </p>
        <p>Visibilidad Garantizada: Amplía el alcance de tu marca</p>
        <p>
          Soluciones Personalizadas: Diseñamos campañas según tus necesidades.
        </p>
        <p className=" text-indo_green font-bold text-xl">
          ¡Contáctanos hoy y comienza a destacar!
        </p>
        <div className="w-full flex flex-col gap-2 ">
          <p>Escríbenos a:</p>
          <div className="flex justify-evenly flex-col lg:flex-row gap-3 lg:py-10">
            <a
              className=" border-2  rounded-xl p-2 px-4 text-gray-500 hover:text-indo_green hover:border-indo_green transition-all ease-in-out flex gap-2 items-center "
              href="mailto:indoamericalaradio@gmail.com"
            >
              <CiMail /> Correo
            </a>
            <a
              href="https://wa.link/5fgocs"
              className="border-2  rounded-xl p-2 text-gray-500 hover:text-indo_green hover:border-indo_green transition-all ease-in-out flex gap-2 items-center"
              target="_blank"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promocion;
