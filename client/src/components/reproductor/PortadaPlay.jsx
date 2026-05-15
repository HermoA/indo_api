import storeRadio from "../../store/StoreRadio";
import { useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import usePlayerStore from "../../store/UsePlayStore";
import { useLocation } from "react-router-dom";

const PortadaPlay = () => {
  const { fetchRadioInfo, radioInfo } = storeRadio();
  const { isPlaying, setIsPlaying } = usePlayerStore();
  const { pathname } = useLocation();

  useEffect(() => {
    let prevTitle = "";

    const updateIfChanged = async () => {
      const data = await fetchRadioInfo(); //Asegúrate de que devuelva data
      if (data?.title && data.title !== prevTitle) {
        prevTitle = data.title;
        //Actualizar portadas u otros datos aquí si hace falta
      }
    };

    updateIfChanged(); // llamada inicial
    const interval = setInterval(updateIfChanged, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className= {pathname === "/" ? "absolute top-1/3 left-[15%] z-40 w-4/12 flex flex-row gap-10 items-center " : " hidden"} >
      <div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-white bg-indo_green rounded-full text-5xl p-5 hover:scale-110 transition-all ease-in"
        >
          {isPlaying ? <FaPause /> : <FaPlay className="pl-2" />}
        </button>
      </div>
      <div className="flex- flex-col text-white drop-shadow-lg">
        <p className="text-indo_green font-semibold text-xl pb-2">
          La Radio de los Éxitos
        </p>
        <p className="text-5xl font-bold">
          Indoamérica La Radio
        </p>
        <p>
          {radioInfo ? radioInfo.title : "La mejor Programación"}{" "}
        </p>
      </div>
    </div>
  );
};

export default PortadaPlay;
