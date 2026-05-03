import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import toast from "react-hot-toast";
import PageTransition from "../../components/PageTransition";
import consultationService from "../../services/consultation.service";
import engagementService from "../../services/engagement.service";

const Engagement = () => {
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultationId, setSelectedConsultationId] = useState("");
  const [texteEngagement, setTexteEngagement] = useState("");
  const [engagements, setEngagements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastBcHash, setLastBcHash] = useState("");

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
        toast.error("Erreur de chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSoumettreEngagement = async () => {
    if (!selectedConsultationId) {
      return toast.error("Veuillez sélectionner une consultation.");
    }

    if (!texteEngagement.trim()) {
      return toast.error("Veuillez rédiger un engagement.");
    }

    setIsSubmitting(true);
    const t = toast.loading("Scellement de l'engagement sur la blockchain...");

    try {
      const response = await engagementService.createEngagement({
        consultationId: selectedConsultationId,
        content: texteEngagement
      });

      setTexteEngagement("");
      setLastBcHash(response.blockchainHash);
      toast.success("Engagement officiellement scellé !", { id: t });
      const updated = await engagementService.getEngagements();
      setEngagements(updated);
    } catch (error) {
      toast.error("Erreur lors de la soumission", { id: t });
    } finally {
      setIsSubmitting(false);
    }
  };

  const engagementCount = engagements.length;
  const approvedCount = engagements.filter((item) => item.status === "approuver").length;
  const rejectedCount = engagements.filter((item) => item.status === "rejeter").length;
  const pendingCount = engagements.filter((item) => item.status === "en cours").length;

  return (
    <PageTransition>
      <div className="h-screen flex flex-col w-full bg-gray-100 overflow-hidden">
        <div className="px-8 pt-8">
          <Navbar title="Prise d'Engagement" description="Rédiger votre engagement officiel suite aux résultats de la consultation" />
        </div>
        <div className="Engagements mt-6 flex-1 min-h-0 font-sans overflow-hidden">
          <div className="max-w-4xl mx-auto px-8 py-4 h-full overflow-auto space-y-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-32 text-gray-400">
                Chargement...
              </div>
            ) : (
              <>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-6 text-bleuFonce font-bold text-xl">
                    <span>État des engagements</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <p className="text-sm text-gray-500 font-medium mb-1">En cours</p>
                      <p className="text-3xl font-bold text-bleuFonce">{pendingCount}</p>
                    </div>
                    <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                      <p className="text-sm text-emerald-600 font-medium mb-1">Approuvés</p>
                      <p className="text-3xl font-bold text-emerald-700">{approvedCount}</p>
                    </div>
                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                      <p className="text-sm text-red-600 font-medium mb-1">Rejetés</p>
                      <p className="text-3xl font-bold text-red-700">{rejectedCount}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-bleuFonce mb-6">Nouvel Engagement Officiel</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 uppercase mb-2 ml-1">Consultation concernée</label>
                      <select
                        value={selectedConsultationId}
                        onChange={(e) => setSelectedConsultationId(e.target.value)}
                        className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-bleuFonce transition-all"
                      >
                        {consultations.map((consultation) => (
                          <option key={consultation._id} value={consultation._id}>
                            {consultation.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-400 uppercase mb-2 ml-1">Déclaration d'engagement</label>
                      <textarea
                        value={texteEngagement}
                        onChange={(e) => setTexteEngagement(e.target.value)}
                        className="w-full h-40 p-4 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-bleuFonce outline-none transition-all resize-none"
                        placeholder="Suite aux résultats de cette consultation citoyenne, nous nous engageons officiellement à ...."
                      />
                    </div>

                    {lastBcHash && (
                      <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700 text-xs font-mono">
                        <div className="bg-emerald-500 text-white p-1 rounded-full px-2 font-sans font-bold">CERTIFIÉ</div>
                        <span className="truncate">Hash: {lastBcHash}</span>
                      </div>
                    )}

                    <button
                      onClick={handleSoumettreEngagement}
                      disabled={isSubmitting}
                      className="w-full py-4 bg-bleuFonce text-white font-bold rounded-2xl hover:shadow-lg active:scale-95 transition-all disabled:opacity-60 text-lg"
                    >
                      {isSubmitting ? "Scellement..." : "Sceller l'engagement"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Engagement;