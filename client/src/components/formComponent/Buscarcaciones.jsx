import { useState } from "react";
import cancionStore from "../../store/CancionStore";

const Buscarcaciones = () => {
  const [query, setQuery] = useState("");
  const { cancion, loading, searchCanciones } = cancionStore();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
        console.log(query);
        
        searchCanciones(query);
    }
  };
  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título o artista"
          className="border p-2 rounded w-full mb-2 bg-black bg-opacity-20"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Buscar
        </button>
      </form>

      {loading && <p className="text-gray-500">Buscando canciones...</p>}

      {!loading && cancion.length === 0 && <p>No se encontraron canciones.</p>}

      <ul className="mt-4">
        {cancion.map((item) => (
          <li key={item.id_cancione} className="mb-3 border-b pb-2">
            <p className="font-bold">{item.titulo}</p>
            <p>{item.artista}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Escuchar
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Buscarcaciones;
