import programaStore from "../../store/ProgramaStore";
import { useEffect } from "react";

const Programas = () => {
    const { verProgramas, programa } = programaStore();

    useEffect(() => {
        verProgramas();
      }, []);
      console.log(programa[0]);
      
  return (
    <div className="w-full mx-auto bg-indo_gray ">
        <div className="h-12"></div>
        {programa.map((programa) => (
            <div key={programa.id_programa} className="w-8/12 mx-auto p-5 flex flex-row justify-between items-center">
                <img
                    src={programa.logo_programa}
                    alt={programa.nombre}
                    className="w-72 object-cover rounded-lg mb-2"
                />
                <div className="">
                    <h2 className="text-xl font-semibold mb-2">
                        {programa.nombre_programa}
                    </h2>
                    <p className="text-gray-400">{programa.descripcion}</p>
                    <p></p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Programas