import DoughnutChart from "../../components/DoughnutChart";
import BarChart from "../../components/SidebarLink";

function ConsultationStats() {

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Statistiques de consultation
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <DoughnutChart />

        <BarChart />

      </div>

    </div>
  );
}

export default ConsultationStats;