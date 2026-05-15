import { useEffect } from "react";
import PortadaAlbun from "./PortadaAlbun";
import storeRadio from "../../store/StoreRadio";

const PortadaReproductor = () => {
  const {
    fetchRadioInfo,
    radioInfo,    
  } = storeRadio(); 

  useEffect(() => {
    fetchRadioInfo();
    const interval = setInterval(fetchRadioInfo, 10000);
    return () => clearInterval(interval);
  }, [fetchRadioInfo]);

  
  return (
    <div className="flex flex-row justify-between items-center gap-4">
      {radioInfo ? (
        <div className="flex items-center gap-4">
          <PortadaAlbun styleclass="w-16 h-16 rounded-lg object-cover" />          
          <div className="text-white">
            <h2 className="text-lg font-semibold">
              {radioInfo.title ? radioInfo.title : "INDOAMERICA LA RADIO"} 
            </h2>
            <p className="text-sm">
              {radioInfo.title
                ? radioInfo.artist
                : "Programación indoamérica la radio"}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-white">Cargando información de la radio...</div>
      )}
    </div>
  );
};

export default PortadaReproductor;
