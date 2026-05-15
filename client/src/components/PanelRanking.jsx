import CrearRanking from "../components/formComponent/CreateRanking";
import Acordeon from "../components/Acordeon";
import VerRanking from "../components/formComponent/VerRanking";
import UpdateRanking from "../components/formComponent/UpdateRanking";

const PanelRanking = () => {
  return (
    <div className="">
      <Acordeon title="Crear Ranking">
        <CrearRanking />
      </Acordeon>
      <Acordeon title="Actualizar Ranking">
        <UpdateRanking rankingId="7" />
      </Acordeon>
      <div className="mb-20">
        <VerRanking />
      </div>
    </div>
  );
};

export default PanelRanking;
