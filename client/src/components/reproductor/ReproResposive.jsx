import { useEffect, useState } from "react";
import Slider from "react-slick";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeMute,
} from "react-icons/fa";
import { IoIosRadio } from "react-icons/io";

import Portada from "./PortadaAlbun";
import storeRadio from "../../store/StoreRadio";
import usePlayerStore from "../../store/UsePlayStore";

const ReproResposive = () => {
  const { fetchRadioInfo, radioInfo } = storeRadio();
  const { isPlaying, setIsPlaying, audioRef } = usePlayerStore();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    fetchRadioInfo();
  }, []);

  const handlePlay = () => {
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);
  };  

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleVolumeSlider = () => {
    setShowVolumeSlider((prev) => !prev);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <FaVolumeMute />;
    if (volume < 0.5) return <FaVolumeDown />;
    return <FaVolumeUp />;
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 9000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    autoplaySpeed: 1000,
    cssEase: "linear",
  };

  return (
    <div className="lg:hidden w-full h-[90vh] overflow-hidden relative flex flex-col justify-center items-center bg-black text-white">
      {/* Fondo desenfocado */}
      <div className=" opacity-70 ">
        <Portada styleclass="blur-lg z-0 w-full h-full object-cover absolute top-0 left-0 flex justify-center items-center" />
      </div>

      {/* Contenido principal */}
      <div className="absolute top-10 left-0 w-full h-8/12 flex flex-col justify-center items-center z-10">
        {/* Imagen portada */}
        <Portada styleclass="w-full object-cover px-12 pb-6 pt-16" />

        {/* Slider + botón en vivo */}
        <div className="flex flex-col items-center w-11/12 px-4 my-4 border-x-2 border-[rgba(255,255,255,0.5)]">
          <Slider
            {...sliderSettings}
            className="w-full text-xl h-12 text-center text-white"
          >
            <div>{radioInfo?.title || "INDOAMERICA LA RADIO"}</div>
            <div>{radioInfo?.title || "INDOAMERICA LA RADIO"}</div>
          </Slider>

          <button
            onClick={handlePlay}
            className="mt-2 flex items-center gap-2 text-gray-100 hover:text-indo_green transition-all"
          >
            <div className="w-3 h-3 bg-indo_green rounded-full" />
            En vivo
          </button>
        </div>

        {/* Botón play/pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-white text-4xl p-5 mt-2 rounded-full border-4 border-[rgba(255,255,255,0.2)]"
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? <FaPause /> : <FaPlay className="pl-2" />}
        </button>

        {/* Controles inferiores */}
        <div className="flex justify-between items-center w-full px-6">
          <IoIosRadio className="text-2xl text-white mt-10" />

          {/* Control de volumen */}
          <div className="relative flex flex-col items-center w-12">
            {/* Slider visible con transición */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                showVolumeSlider ? "opacity-100 scale-100" : "opacity-0 scale-0"
              } absolute bottom-16 h-28 flex items-center justify-center`}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="h-28 w-2 bg-gray-400/30 dark:bg-gray-700/50 appearance-none rounded-full cursor-pointer accent-indo_green"
                style={{
                  writingMode: "bt-lr",
                  WebkitAppearance: "slider-vertical",
                }}
              />
            </div>

            {/* Botón de volumen */}
            <button
              onClick={toggleVolumeSlider}
              className="mt-10 text-2xl text-white hover:text-indo_green transition duration-300 ease-in-out"
              aria-label="Control de volumen"
            >
              {getVolumeIcon()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReproResposive;
