import { useEffect, useState } from "react";
import cancionStore from "../../store/CancionStore";

// eslint-disable-next-line react/prop-types
const VerCancion = ({ id }) => {
  const { verCancion } = cancionStore();
  const [cancion, setCancion] = useState({
    titulo: "",
    artista: "",
    link: "",
  });

  useEffect(() => {
    const fetchCancion = async () => {
      const getCancion = await verCancion(id);
      setCancion({
        titulo: getCancion.titulo,
        artista: getCancion.artista,
        link: getCancion.link,
      });
    };
    if (id) {
      fetchCancion();
    }
  }, [id, verCancion]);
  return (
    <div className="flex -flex-row gap-2 items-center">
      <h2 className="font-bold"> {cancion.titulo} </h2>
      <p className="font-light">{cancion.artista} </p>
      {/*<iframe
        src={`https://open.spotify.com/embed/track/${cancion.link}?utm_source=generator&theme=0`}
        width="100%"
        height="100"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>*/}
    </div>
  );
};

export default VerCancion;
