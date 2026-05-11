import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import ChartContainer from "../../components/ChartContainer";
import DoughnutChart from "../../components/DoughnutChart";
import CustomBarChart from "../../components/BarChart";
import consultationService from "../../services/consultation.service";
import engagementService from "../../services/engagement.service";
import voteService from "../../services/vote.service";

function Dashboard() {
  const [consultations, setConsultations] = useState([]);
  const [engagements, setEngagements] = useState([]);
  const [voteStats, setVoteStats] = useState({ total: 0, yes: 0, no: 0, abstain: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [consultationsData, engagementsData] = await Promise.all([
          consultationService.getConsultations(),
          engagementService.getEngagements(),
        ]);

        setConsultations(consultationsData);
        setEngagements(engagementsData);

        if (consultationsData.length > 0) {
          const firstConsultationId = consultationsData[0]._id;
          const results = await voteService.getVoteStats(firstConsultationId);
          setVoteStats(results);
        }
      } catch (error) {
        console.error("Erreur de chargement du tableau de bord :", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const activeCount = consultations.filter((item) => item.status === "active").length;
  const closedCount = consultations.filter((item) => item.status === "closed").length;
  const totalEngagements = engagements.length;
  const participation = voteStats.total ? `${Math.round((voteStats.yes + voteStats.no + voteStats.abstain) / Math.max(voteStats.total, 1) * 100)} %` : "...";

  const pieData = [
    { name: "OUI", value: voteStats.yes, color: "#34E8CD" },
    { name: "NON", value: voteStats.no, color: "#FF844B" },
    { name: "ABSTENTION", value: voteStats.abstain, color: "#003C64" }
  ];

  const arrondissements = consultations.reduce((acc, item) => {
    acc[item.arrondissement] = (acc[item.arrondissement] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(arrondissements).map(([name, count]) => ({ name, v1: count, v2: 0 }));

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-xl font-semibold">
        Chargement du tableau de bord...
      </div>
    );
  }

  return (
    <div className="flex-1 h-full overflow-auto bg-gray-100">
      <div className="p-8">
        <Navbar title="Tableau de bord" description="Vue d'ensemble des consultations, des engagements et des résultats de vote" />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
          <StatCard title="Consultations totales" value={consultations.length} label="Consultations créées" icon={() => null} />
          <StatCard title="Consultations actives" value={activeCount} label="Consultations en cours" icon={() => null} />
          <StatCard title="Engagements" value={totalEngagements} label="Engagements enregistrés" icon={() => null} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
          <ChartContainer title="Répartition des votes (1ère consultation)">
            <DoughnutChart data={pieData} />
          </ChartContainer>

          <ChartContainer title="Consultations par arrondissement">
            <CustomBarChart data={barData} />
          </ChartContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-3">Votes enregistrés</h3>
            <p className="text-3xl font-semibold">{voteStats.total}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-3">Participation estimée</h3>
            <p className="text-3xl font-semibold">{participation}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-3">Consultations clôturées</h3>
            <p className="text-3xl font-semibold">{closedCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
