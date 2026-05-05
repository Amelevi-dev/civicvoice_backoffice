import { useState, useEffect } from "react";
import DoughnutChart from "../../components/DoughnutChart";
import BarChart from "../../components/BarChart";
import consultationService from "../../services/consultation.service";
import voteService from "../../services/vote.service";

function ConsultationStats() {
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState("");
  const [globalStats, setGlobalStats] = useState({
    pieData: [],
    barData: []
  });
  const [specificStats, setSpecificStats] = useState({
    resultsData: [],
    genderData: [],
    ageData: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  useEffect(() => {
    const loadConsultations = async () => {
      try {
        const data = await consultationService.getConsultations();
        setConsultations(data);

        // Global stats logic
        const statusCounts = data.reduce(
          (acc, c) => {
            acc[c.status] = (acc[c.status] || 0) + 1;
            acc[c.arrondissement] = (acc[c.arrondissement] || 0) + 1;
            return acc;
          },
          { active: 0, closed: 0 }
        );

        setGlobalStats({
          pieData: [
            { name: "Actives", value: statusCounts.active || 0, color: "#34E8CD" },
            { name: "Fermées", value: statusCounts.closed || 0, color: "#FF844B" }
          ],
          barData: Object.entries(statusCounts)
            .filter(([key]) => key !== "active" && key !== "closed")
            .map(([arr, count]) => ({ name: arr, v1: count, v2: 0 }))
        });

        if (data.length > 0) {
          setSelectedConsultation(data[0]._id);
        }
      } catch (error) {
        console.error("Erreur chargement consultations", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadConsultations();
  }, []);

  useEffect(() => {
    if (!selectedConsultation) return;

    const loadDetailStats = async () => {
      setIsDetailLoading(true);
      try {
        const results = await voteService.getVoteStats(selectedConsultation);
        
        // Transform Results to Pie Data
        const total = results.total || 1; // avoid div by 0 for display %
        setSpecificStats({
          resultsData: [
            { name: "Pour", value: results.yes, color: "#34E8CD" },
            { name: "Contre", value: results.no, color: "#FF844B" },
            { name: "Abstention", value: results.abstain, color: "#94A3B8" }
          ],
          genderData: [
            { name: "Hommes", value: results.demographics?.gender?.male || 0, color: "#3498DB" },
            { name: "Femmes", value: results.demographics?.gender?.female || 0, color: "#E91E63" },
            { name: "Autres", value: results.demographics?.gender?.other || 0, color: "#BDC3C7" }
          ],
          ageData: Object.entries(results.demographics?.age || {}).map(([label, val]) => ({
            name: label,
            v1: val,
            v2: 0
          }))
        });
      } catch (error) {
        console.error("Erreur chargement détails", error);
      } finally {
        setIsDetailLoading(false);
      }
    };
    loadDetailStats();
  }, [selectedConsultation]);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Analytique Citoyenne</h1>
        <select 
          className="p-3 rounded-xl border border-gray-200 bg-white shadow-sm outline-none focus:ring-2 focus:ring-[#34E8CD]"
          value={selectedConsultation}
          onChange={(e) => setSelectedConsultation(e.target.value)}
        >
          {consultations.map(c => (
            <option key={c._id} value={c._id}>{c.title}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
           <p className="text-gray-500 animate-pulse">Initialisation des données...</p>
        </div>
      ) : (
        <>
          {/* SECTION 1: DÉTAILS DE LA CONSULTATION SÉLECTIONNÉE */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-[#34E8CD] rounded-full"></span>
              Analyse du scrutin sélectionné
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-6 text-gray-600">Suffrages exprimés</h3>
                {isDetailLoading ? <div className="h-64 flex items-center justify-center">...</div> : <DoughnutChart data={specificStats.resultsData} />}
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-6 text-gray-600">Répartition par Genre</h3>
                {isDetailLoading ? <div className="h-64 flex items-center justify-center">...</div> : <DoughnutChart data={specificStats.genderData} />}
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-6 text-gray-600">Répartition par Âge</h3>
                {isDetailLoading ? <div className="h-80 flex items-center justify-center">...</div> : <BarChart data={specificStats.ageData} />}
              </div>
            </div>
          </div>

          {/* SECTION 2: VUE D'ENSEMBLE GLOBALE */}
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
              Vue d'ensemble du projet
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-6 text-gray-600">Statut des consultations</h3>
                <DoughnutChart data={globalStats.pieData} />
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-6 text-gray-600">Volume par Arrondissement</h3>
                <BarChart data={globalStats.barData} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ConsultationStats;