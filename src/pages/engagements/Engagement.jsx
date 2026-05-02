import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import consultationService from "../../services/consultation.service";
import engagementService from "../../services/engagement.service";

const Engagement = () => {
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultationId, setSelectedConsultationId] = useState("");
  const [texteEngagement, setTexteEngagement] = useState("");
  const [engagements, setEngagements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [consultationsData, engagementsData] = await Promise.all([
          consultationService.getConsultations(),
          engagementService.getEngagements()
        ]);

        setConsultations(consultationsData);
        setEngagements(engagementsData);
        setSelectedConsultationId(consultationsData[0]?._id || "");
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSoumettreEngagement = async () => {
    if (!selectedConsultationId) {
      return alert("Veuillez sélectionner une consultation.");
    }

    if (!texteEngagement.trim()) {
      return alert("Veuillez rédiger un engagement avant de le sceller.");
    }

    setIsSubmitting(true);

    try {
      await engagementService.createEngagement({
        consultationId: selectedConsultationId,
        content: texteEngagement
      });

      setTexteEngagement("");
      alert("Engagement scellé avec succès !");
      const updated = await engagementService.getEngagements();
      setEngagements(updated);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'engagement :", error);
      alert("Impossible de soumettre l'engagement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const engagementCount = engagements.length;
  const approvedCount = engagements.filter((item) => item.status === "approuver").length;
  const rejectedCount = engagements.filter((item) => item.status === "rejeter").length;
  const pendingCount = engagements.filter((item) => item.status === "en cours").length;

  return (
    <div className="h-screen flex flex-col w-[75%]">
      <Navbar title="Prise d'Engagement" description="Rédiger votre engagement officiel suite aux résultats de la consultation" />
      <div className="Engagements mt-6 flex-1 min-h-0 bg-gray-100 font-sans overflow-hidden">
        <div className="max-w-3xl mx-auto p-6 h-full overflow-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-500 font-medium">Chargement des données...</p>
            </div>
          ) : (
            <>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="flex items-center gap-2 mb-2 text-emerald-600 font-semibold">
                  <span>Engagements publiés</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {engagementCount} engagement(s) enregistré(s) sur {consultations.length} consultation(s).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">En cours</p>
                    <p className="text-2xl font-semibold">{pendingCount}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Approuvés</p>
                    <p className="text-2xl font-semibold">{approvedCount}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Rejetés</p>
                    <p className="text-2xl font-semibold">{rejectedCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Sélection de la consultation</h3>
                <select
                  value={selectedConsultationId}
                  onChange={(e) => setSelectedConsultationId(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {consultations.map((consultation) => (
                    <option key={consultation._id} value={consultation._id}>
                      {consultation.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Rédiger l'engagement officiel</h3>
                <textarea
                  value={texteEngagement}
                  onChange={(e) => setTexteEngagement(e.target.value)}
                  className="w-full h-32 p-4 mb-4 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Suite aux résultats de cette consultation citoyenne, nous nous engageons à ...."
                />

                <button
                  onClick={handleSoumettreEngagement}
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? "Enregistrement..." : "Sceller l'engagement"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Engagement;
