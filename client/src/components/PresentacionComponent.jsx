import { useEffect, useRef } from "react";
import storeRadio from "../store/StoreRadio";
import logo from "../assets/portada_1.jpg";

//Función para limpiar títulos
const cleanTitle = (rawTitle = "") => {
  return rawTitle
    .replace(/^\d+\.\)\s*/, "") // elimina número inicial
    .replace(/<br>/gi, "") // elimina etiquetas <br>
    .replace(/ft\./gi, "feat") // reemplaza ft. por feat
    .trim();
};

const PresentacionComponent = () => {
  const {
    fetchRadioInfo,
    radioInfo,
    verPortadaPanel,
    portadapanel,
    portada,
    portadaOne,
    portadaTwo,
    verPortada,
    verPortadaOne,
    verPortadaTwo,
  } = storeRadio();
  const prevTitleRef = useRef("");

  //Cargar info de radio cada 10 segundos
  useEffect(() => {
    fetchRadioInfo();
    const interval = setInterval(fetchRadioInfo, 10000);
    return () => clearInterval(interval);
  }, [fetchRadioInfo]);

  useEffect(() => {
    const actPortada = () => {
      if (radioInfo && radioInfo.title !== prevTitleRef.current) {
        verPortadaPanel();
        prevTitleRef.current = radioInfo.title;
      }
    };
    actPortada();
    const interval = setInterval(actPortada, 10000);
    return () => clearInterval(interval);
  }, [radioInfo, verPortadaPanel]);

  //Buscar portadas cuando cambie radioInfo
  useEffect(() => {
    if (!radioInfo?.history) return;

    try {
      const titleCurrent = cleanTitle(radioInfo.title);
      const titleOne = cleanTitle(radioInfo.history[1]);
      const titleTwo = cleanTitle(radioInfo.history[2]);

      verPortada(titleCurrent);

      verPortadaOne(titleOne);

      verPortadaTwo(titleTwo);
    } catch (error) {
      console.error("Error al procesar los títulos:", error);
    }
  }, [radioInfo, verPortada, verPortadaOne, verPortadaTwo]);

  return (
    <div className=" hidden lg:block w-full h-[700px] bg-black mb-8">
      <div>
        <img
          src={portada ? portada : portadapanel ? portadapanel.art : logo}
          alt=""
          className="xl:h-[700px] h-[600px] w-7/12 object-cover absolute z-40 blur-xl"
          style={{
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
          }}
        />
      </div>
      <div>
        <img
          src={portada ? portada : portadapanel ? portadapanel.art : logo}
          alt=""
          className="xl:h-[700px] h-[600px] w-4/12 object-cover absolute z-30 right-1/4 drop-shadow-2xl saturate-50"
          style={{
            clipPath: "polygon(50% 0, 90% 0, 60% 100%, 15% 100%)",
          }}
        />
      </div>
      <div>
        <img
          src={portadaOne? portadaOne : "https://i.scdn.co/image/ab67616d0000b273e7fbc0883149094912559f2c"}
          alt=""
          className="xl:h-[700px] h-[600px] w-4/12 object-cover absolute z-20 right-32 drop-shadow-2xl saturate-50"
          style={{
            clipPath: "polygon(0 0, 80% 0, 55% 100%, 0% 100%)",
          }}
        />
      </div>
      <div>
        <img
          src={portadaTwo? portadaTwo : "https://i.scdn.co/image/ab67616d0000b273eda9478c39a21e1cdc6609ca"}
          alt=""
          className="xl:h-[700px] h-[600px] w-4/12 object-cover absolute z-10 right-0 saturate-50"
        />
      </div>
    </div>
  );
};

export default PresentacionComponent;
