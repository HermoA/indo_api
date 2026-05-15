import { useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaVolumeDown } from "react-icons/fa";
import usePlayerStore from "../../store/UsePlayStore";
import { useState } from "react";

const Player = () => {
  const audioRef = useRef(null);
  const { isPlaying, setIsPlaying, setAudioRef } = usePlayerStore();
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    setAudioRef(audioRef);
  }, [setAudioRef]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  }; 

  return (
    <div className="flex flex-row items-center justify-between gap-4 pl-10">
      <audio ref={audioRef} src="https://live.turadiotv.com/8160/stream" />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="rounded-full bg-indo_green hover:bg-green-600 transition-all ease-in text-white p-4"
      >
        {isPlaying ? <FaPause /> : <FaPlay className="ml-[2px]" />}
      </button>
      <button
        className="text-gray-500 flex flex-row items-center gap-2 hover:text-indo_green transition-all ease-in"
        onClick={() => {
          audioRef.current.load();
          audioRef.current.play();
          setIsPlaying(true);
        }}
      >
        <div className="w-3 h-3 bg-indo_green rounded-full"></div>En vivo
      </button>
      <div className="flex flex-row items-center gap-2 hover:text-white transition-all ease-in">
        <div className="text-xl flex justify-center items-center text-gray-500">
          {volume >= 0.5 ? <FaVolumeUp /> : volume === 0 ? <FaVolumeMute /> : <FaVolumeDown />}
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="h-1 w-32 accent-indo_green bg-indo_green rounded-lg cursor-pointer border-transparent"
        />
      </div>
    </div>
  );
};

export default Player;

