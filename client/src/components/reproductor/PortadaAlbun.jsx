import { useEffect } from "react";
import storeRadio from "../../store/StoreRadio";
import portada_1 from "../../assets/portada_1.jpg";

// eslint-disable-next-line react/prop-types
const PortadaAlbun = ({ styleclass }) => {
  const {
    fetchRadioInfo,
    radioInfo,
    portada,
    verPortada,
    verPortadaPanel,
    portadapanel,
  } = storeRadio();

  useEffect(() => {
    fetchRadioInfo();
    const interval = setInterval(fetchRadioInfo, 10000);
    return () => clearInterval(interval);
  }, [fetchRadioInfo]);

  useEffect(() => {
    const noCoverUrl = "https://live.turadiotv.com/cp/musiclibrary/nocover.png";

    const actPortada = async () => {
      await verPortadaPanel();
      const portadaActual = portadapanel.art;

      if (portadaActual === noCoverUrl) {
        return;
      }

      // Si ya no es la imagen por defecto, detener el intervalo
      clearInterval(interval);
      console.log("Portada actualizada:", portadaActual);
    };

    const interval = setInterval(actPortada, 3000); // intenta cada 3 segundos

    // Ejecutar inmediatamente también
    actPortada();

    return () => clearInterval(interval);
  }, [verPortadaPanel]);

  useEffect(() => {
    if (radioInfo) {
      verPortada(radioInfo.title);
    }
  }, [radioInfo, verPortada]);

  /*src={portada ? portada : portadapanel ? portadapanel.art : portada_1}*/
  return (
    <div>
      <img
        src={portada ? portada : portadapanel ? portadapanel.art : portada_1}
        alt="portada"
        className={styleclass}
      />
    </div>
  );
};

export default PortadaAlbun;
