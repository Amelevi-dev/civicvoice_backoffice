import { useState, useEffect } from "react";
import DoughnutChart from "../../components/DoughnutChart";
import BarChart from "../../components/BarChart";
import consultationService from "../../services/consultation.service";

function ConsultationStats() {
  const [consultations, setConsultations] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await consultationService.getConsultations();
        setConsultations(data);

        const statusCounts = data.reduce(
          (acc, consultation) => {
            acc[consultation.status] = (acc[consultation.status] || 0) + 1;
            acc[consultation.arrondissement] = (acc[consultation.arrondissement] || 0) + 1;
            return acc;
          },
          { active: 0, closed: 0 }
        );

        setPieData([
          { name: "Actives", value: statusCounts.active || 0, color: "#34E8CD" },
          { name: "Fermées", value: statusCounts.closed || 0, color: "#ff7f50" }
        ]);

        setBarData(
          Object.entries(statusCounts)
            .filter(([key]) => key !== "active" && key !== "closed")
            .map(([arrondissement, count]) => ({
              name: arrondissement,
              v1: count,
              v2: 0
            }))
        );
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Statistiques de consultation</h1>

      {isLoading ? (
        <div className="text-gray-600">Chargement des statistiques...</div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Répartition par statut</h2>
            <DoughnutChart data={pieData} />
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Consultations par arrondissement</h2>
            <BarChart data={barData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsultationStats;