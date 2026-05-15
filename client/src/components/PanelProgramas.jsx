import { useEffect, useState } from "react";
import programaStore from "../store/ProgramaStore";
import { IoClose } from "react-icons/io5";
import CrearPrograma from "../components/formComponent/CrearPrograma";
import { FaRegEdit } from "react-icons/fa";
import Acordeon from "../components/Acordeon";
import Update from "../components/formComponent/UpdateProgramaComponent";

const PanelProgramas = () => {
  const { verProgramasDias, ProgramasDias, loading, deleteProgram } = programaStore();
  const [idPrograma, setIdprograma] = useState(null);

  useEffect(() => {
    verProgramasDias();
  }, [verProgramasDias]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este programa de radio?"
    );
    if (confirmDelete) {
      deleteProgram(id);
    }
  };

  if (loading) return <p className="text-center py-10 text-gray-400">Cargando programas...</p>;

  return (
    <div className="w-full px-4 max-w-7xl mx-auto py-6">
      {/* Sección: Crear Programa */}
      <Acordeon title={"Crear Programa"}>
        <CrearPrograma />
      </Acordeon>

      {/* Sección: Editar Programa */}
      {idPrograma && (
        <div className="relative mt-6 border border-slate-200 p-4 rounded-md shadow-md">
          <button
            onClick={() => setIdprograma(null)}
            className="absolute top-2 right-2 text-xl hover:text-red-500 transition"
          >
            <IoClose />
          </button>
          <Update id={idPrograma} />
        </div>
      )}

      {/* Lista de Programas */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ProgramasDias.map((p) => (
          <div
            key={p.id_programa}
            className="relative bg-black bg-opacity-30 text-white p-4 rounded-xl shadow-md flex flex-col gap-3"
          >
            {/* Acciones */}
            <div className="absolute top-2 right-2 flex gap-2 text-lg">
              <button
                onClick={() => setIdprograma(p.id_programa)}
                className="hover:text-indo_green transition"
              >
                <FaRegEdit />
              </button>
              <button
                onClick={() => handleDelete(p.id_programa)}
                className="hover:text-red-500 transition"
              >
                <IoClose />
              </button>
            </div>

            {/* Contenido */}
            <img
              src={p.logo_programa}
              alt="Logo programa"
              className="w-full h-40 object-cover rounded-md"
            />

            <div>
              <h3 className="text-xl font-bold text-indo_green">{p.nombre_programa}</h3>
              <p className="text-sm text-gray-300">{p.conductor}</p>
            </div>

            <p className="text-sm text-gray-200 line-clamp-4">{p.descripcion}</p>

            <div className="mt-2 text-xs text-gray-400 font-semibold">
              <p>{p.dias}</p>
              <p>
                {p.horario_in} - {p.horario_out}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelProgramas;
