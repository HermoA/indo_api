import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Plugins
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

// Tus imágenes locales
import f1 from "../../assets/FOTOS RADIO/AGUSTIN VERA.jpg";
import f2 from "../../assets/FOTOS RADIO/ANGEL COLQUE.jpg";
import f3 from "../../assets/FOTOS RADIO/CABINA.jpg";
import f4 from "../../assets/FOTOS RADIO/EQUIPO INDOAMERICA.jpg";
import f5 from "../../assets/FOTOS RADIO/ESCUELA INDOAMERICANA.jpg";
import f6 from "../../assets/FOTOS RADIO/FIESTA DE CLASICOS INDOAMERICA.jpg";
import f7 from "../../assets/FOTOS RADIO/GUSTAVO ZAMBRANA.jpg";
import f8 from "../../assets/FOTOS RADIO/KING AFRICA EN LOS ESTUDIOS.jpg";
import f9 from "../../assets/FOTOS RADIO/LA VOZ DE ORO DE INDOAMERICA.jpg";
import g1 from "../../assets/FOTOS RADIO/NINOSKA BASPINEYRO.jpg";
import g2 from "../../assets/FOTOS RADIO/PERSONAL EMISORA.jpg";
import g3 from "../../assets/FOTOS RADIO/PREMIACION 65 ANNOS ALCALDIA MUNICIPAL POTOSI.jpg";
import logo from "../../assets/FOTOS RADIO/PRIMER LOGO.jpg";

// Descripción de las fotos
const photos = [
  { src: f1, title: "AGUSTIN VERA" },
  { src: f2, title: "ANGEL COLQUE" },
  { src: f3, title: "CABINA" },
  { src: f4, title: "EQUIPO INDOAMERICA" },
  { src: f5, title: "ESCUELA INDOAMERICANA" },
  { src: f6, title: "FIESTA DE CLASICOS INDOAMERICA" },
  { src: f7, title: "GUSTAVO ZAMBRANA" },
  { src: f8, title: "KING AFRICA EN LOS ESTUDIOS" },
  { src: f9, title: "LA VOZ DE ORO DE INDOAMERICA" },
  { src: g1, title: "NINOSKA BASPINEYRO" },
  { src: g2, title: "PERSONAL EMISORA" },
  { src: g3, title: "PREMIACION 65 AÑOS ALCALDIA MUNICIPAL POTOSI" },
  { src: logo, title: "PRIMER LOGO" },
];

export default function Galeria() {
  const [index, setIndex] = useState(-1);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Galería en grid de 3 columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative cursor-pointer overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() => setIndex(i)}
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2 text-white text-center">
              <span className="text-sm sm:text-base font-semibold">
                {photo.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos.map((img) => ({ src: img.src, title: img.title }))}
        plugins={[Captions, Zoom, Fullscreen]}
        captions={{ descriptionTextAlign: "center" }}
        render={{
          caption: ({ slide }) => (
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white text-center p-4">
              <h2 className="text-xl md:text-2xl font-bold">{slide.title}</h2>
              <p className="text-sm opacity-80">Indoamérica la radio</p>
            </div>
          ),
        }}
      />
    </div>
  );
}
