import BgSlider from "../assets/bg_1.jpg";
import Slider from "react-slick";
import Programas from "./Programas";
import RadioAtaca from "../assets/BLANCO.png";
import Bonus from "../assets/BONUS TRACK PNG.png";
import Caleidoscopio from "../assets/CALEIDOSCOPIO PNG.png";
import Dimencion from "../assets/DIMENSION DESCONOCIDA PNG.png";
import Volviendo from "../assets/LOGO-BLANCO.png";
import SinFiltro from "../assets/SIN-FONDO-BLANCO.png";
import Stereo from "../assets/STEREO TOP BOL PNG.png";
import Portada from "../components/Portada";
import { useState, useEffect } from "react";

function Carousel() {
  const [vardots, setVardots] = useState(true);

  useEffect(() => {
    // Función que ajusta los dots dependiendo del ancho de la ventana
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setVardots(false);
      } else {
        setVardots(true);
      }
    };

    // Ejecutar en el montaje del componente
    handleResize();
  }, []);
  var settings = {
    dots: vardots,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: vardots,
    autoplaySpeed: 5000,
  };
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-full lg:h-[700px] h-[550px] lg:py-24 p-0 z-0 bg-slate-100">
        <img
          src={BgSlider}
          alt="slider"
          className=" object-cover w-full h-full"
        />
      </div>
      <div className=" w-full z-20 bg-[rgba(0,0,0,0.2)] h-36 absolute lg:mt-60 mt-96"></div>
      <Slider {...settings} className=" lg:w-[95%] z-20 absolute ">
        <div>
          <Portada />
        </div>
        <div>
          <Programas
            img={Caleidoscopio}
            titulo="Caleidoscopio"
            horario="LUNES A VIERNES de 08:00 a 09:00 am"
            descripcion="Verónica Villafuerte y Esther Zuleta te traen las noticias más relevantes con un enfoque fresco y entretenido."
          />
        </div>
        <div>
          <Programas
            img={Bonus}
            titulo="Bonus Track"
            horario="MARTES A VIERNES de 15:00 a 17:00 pm"
            descripcion="Mauricio Salamanca Baspineiro te trae Bonus Track, con los hits más recientes del Top 40 para que estés al tanto de lo mejor de la música actual."
          />
        </div>
        <div>
          <Programas
            img={RadioAtaca}
            titulo="La Radio Ataca"
            horario="LUNES A VIERNES de 10:00 a 12:00 pm"
            descripcion="Juan José Jota Baspineyro mezcla noticias del día con música y entretenimiento para energizar tus mañanas."
          />
        </div>
        <div>
          <Programas
            img={Volviendo}
            titulo="Volviendo a Casa"
            horario="LUNES A VIERNES de 19:00 a 21:00 pm"
            descripcion="Julio César Ibarra y Edwin Melean te acompañan con noticias y música para un regreso a casa relajado."
          />
        </div>
        <div>
          <Programas
            img={Dimencion}
            titulo="Dimensión Desconocida
"
            horario="VIERNES de 21:00 a 00:00 pm
"
            descripcion="Sumérgete en 'Dimensión Desconocida' con Richard Montesinos Flores, Rubén Bobarín y Dulfredo Paredes, donde revivimos los inolvidables hits que marcaron toda una generación."
          />
        </div>
        <div>
          <Programas
            img={SinFiltro}
            titulo="Sin Filtro"
            horario="SÁBADOS de 06:00 a 09:00 am"
            descripcion="Manuel Soux te invita a comenzar el día con Sin Filtro, una revista matutina repleta de noticias, música y un toque de diversión para animar tus mañanas."
          />
        </div>
        <div>
          <Programas
            img={Stereo}
            titulo="Stereo Top Bol"
            horario="MIÉRCOLES de 21:30 a 00:00 pm"
            descripcion="Únete a Loi Dávila en Stereo Top Bol, un viaje sonoro que destaca lo mejor del rock y pop boliviano, celebrando las melodías que marcan la escena musical del país."
          />
        </div>
      </Slider>
    </div>
  );
}
export default Carousel;
