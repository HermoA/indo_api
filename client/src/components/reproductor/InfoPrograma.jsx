import { useEffect } from "react";
import programaStore from "../../store/ProgramaStore";

const InfoPrograma = () => {
  const { actual, verActual, verProgramas, programa } = programaStore();

  useEffect(() => {
    verActual();
    verProgramas();
  }, [verActual, verProgramas]);

 

  const renderContenido = (programaa) => (
    <div className="flex flex-row items-center justify-between px-10 w-full border-t border-gray-300 pt-2">
      <div>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 text-center mb-8">
          Estás escuchando
        </h2>
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={
              actual.length > 0
                ? actual[0].logo_programa
                : "https://www.indoamericalaradio.com/uploadftp/programas/INDO-HITS_A.jpg"
            }
            alt="Logo del programa"
            className="w-64 h-64 object-cover rounded-xl shadow-md"
          />
          <div className="text-left space-y-4 max-w-lg">
            <h3 className="text-3xl font-bold text-white">
              {actual.length > 0 ? actual[0].nombre_programa : "Indo - Hits"}
            </h3>
            <p className="text-white">
              {actual.length > 0
                ? actual[0].descripcion
                : "Los éxitos que están sonando fuerte, siempre a tu alcance. La mejor selección de hits para que no pierdas el ritmo."}
            </p>
            {programaa.horario_in && (
              <p className="text-sm text-gray-300">
                <strong>Horario:</strong> {programaa.horario_in} -{" "}
                {actual.length > 0 ? actual[0].horario_out : "00:00"}
              </p>
            )}
            {actual.length > 0
              ? actual[0].dias && (
                  <p className="text-sm text-gray-300">
                    <strong>Días:</strong> {programaa.dias}
                  </p>
                )
              : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 h-72 px-2 overflow-auto w-6/12 scrollbar-thin scrollbar-custom ">
        {programa.map((pro) => (
          <div
            key={pro.id_programa}
            className="flex flex-row justify-between items-center gap-4 border-b border-gray-300 "
          >
            <img
              src={pro.logo_programa}
              alt="logo"
              className=" w-16 h-16 object-cover"
            />
            <p className="text-xl font-bold">{pro.nombre_programa} </p>
            <p>
              {pro.horario_in} - {pro.horario_out}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  if (!actual || actual.length === 0) {
    return renderContenido({});
  }

  return renderContenido(actual[0]);
};

export default InfoPrograma;
