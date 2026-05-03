import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import ChartContainer from "../../components/ChartContainer";
import DoughnutChart from "../../components/DoughnutChart";
import CustomBarChart from "../../components/BarChart";
import consultationService from "../../services/consultation.service";
import engagementService from "../../services/engagement.service";
import voteService from "../../services/vote.service";
import blockchainService from "../../services/blockchain.service";
import PageTransition from "../../components/PageTransition";
import MaliMap from "../../components/MaliMap";
import toast from "react-hot-toast";

function Dashboard() {
  const [consultations, setConsultations] = useState([]);
  const [engagements, setEngagements] = useState([]);
  const [voteStats, setVoteStats] = useState({ total: 0, yes: 0, no: 0, abstain: 0 });
  const [blockchainStats, setBlockchainStats] = useState({ totalBlocks: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [consultationsData, engagementsData, bcStats] = await Promise.all([
          consultationService.getConsultations(),
          engagementService.getEngagements(),
          blockchainService.getStats()
        ]);

        setConsultations(consultationsData);
        setEngagements(engagementsData);
        setBlockchainStats(bcStats);

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

  const handleRegionClick = (region) => {
    toast(`Statistiques pour la région de ${region.name} en cours de chargement...`, {
        icon: '📍',
    });
  };

  const closedCount = consultations.filter((item) => item.status === "closed").length;
  const totalEngagements = engagements.length;
  const participation = voteStats.total ? `${Math.round((voteStats.yes + voteStats.no + voteStats.abstain) / Math.max(voteStats.total, 1) * 100)} %` : "0 %";

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
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Chargement du tableau de bord...
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="flex-1 overflow-auto bg-gray-100 h-full">
        <div className="p-8">
          <Navbar title="Observatoire de la Gouvernance" description="Suivi en temps réel de la démocratie participative et de la redevabilité des élus" />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
            <StatCard title="Consultations Lancées" value={consultations.length} label="Espaces de dialogue ouverts" icon={() => null} />
            <StatCard title="Pactes de Redevabilité" value={totalEngagements} label="Engagements scellés sur Blockchain" icon={() => null} />
            <StatCard title="Indice de Confiance" value={participation} label="Participation citoyenne active" icon={() => null} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
            <ChartContainer title="Volonté Citoyenne (Résultats de Vote)">
              <DoughnutChart data={pieData} />
            </ChartContainer>

            <MaliMap onRegionClick={handleRegionClick} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            <ChartContainer title="Dynamisme par Commune">
              <CustomBarChart data={barData} />
            </ChartContainer>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center gap-6">
                <div>
                    <h3 className="text-gray-500 font-medium text-sm mb-1">Votes enregistrés</h3>
                    <p className="text-bleuFonce font-bold text-4xl">{voteStats.total}</p>
                </div>
                <div>
                    <h3 className="text-gray-500 font-medium text-sm mb-1">Consultations clôturées</h3>
                    <p className="text-bleuFonce font-bold text-4xl">{closedCount}</p>
                </div>
                <div className="pt-4 border-t border-gray-50">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider italic">Mise à jour en temps réel via Blockchain</p>
                </div>
            </div>

            <div className="bg-orangeClair rounded-3xl p-8 shadow-lg flex flex-col justify-between text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-bold text-xl mb-2">Alerte Redevabilité</h3>
                    <p className="text-orange-100 text-sm">
                        {totalEngagements === 0 ? "Aucun pacte de redevabilité n'a été scellé pour le moment." : `${totalEngagements} engagements ont été gravés dans la blockchain. Les citoyens attendent des preuves de réalisation.`}
                    </p>
                </div>
                <button className="relative z-10 mt-6 bg-white text-orangeClair py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors shadow-sm">
                    Générer Rapport Public
                </button>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Dashboard;