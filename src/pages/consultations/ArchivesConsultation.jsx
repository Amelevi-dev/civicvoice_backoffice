import { useState, useEffect } from "react";
import consultationService from "../../services/consultation.service";
import engagementService from "../../services/engagement.service";
import voteService from "../../services/vote.service";

function ArchivesConsultation() {
  const [consultations, setConsultations] = useState([]);
  const [engagements, setEngagements] = useState([]);
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("archived"); // all, active, closed, archived
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [consultationStats, setConsultationStats] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [consultationsData, engagementsData] = await Promise.all([
          consultationService.getConsultations(),
          engagementService.getEngagements()
        ]);
        setConsultations(consultationsData);
        setEngagements(engagementsData);
        setFilteredConsultations(consultationsData.filter(c => c.status === "archived"));
      } catch (error) {
        console.error("Erreur lors du chargement des données", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredConsultations(consultations);
    } else {
      setFilteredConsultations(consultations.filter(c => c.status === filter));
    }
  }, [filter, consultations]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleConsultationClick = async (consultation) => {
    setSelectedConsultation(consultation);
    try {
      const stats = await voteService.getVoteStats(consultation._id);
      setConsultationStats(stats);
    } catch (error) {
      console.error("Erreur lors du chargement des stats", error);
    }
  };

  const getEngagementsForConsultation = (consultationId) => {
    return engagements.filter(e => {
      const cid = e.consultationId && (e.consultationId._id || e.consultationId)
      return cid && cid.toString() === consultationId.toString()
    })
  };

  const reloadData = async () => {
    setIsLoading(true)
    try {
      const [consultationsData, engagementsData] = await Promise.all([
        consultationService.getConsultations(),
        engagementService.getEngagements()
      ])
      setConsultations(consultationsData)
      setEngagements(engagementsData)
      // keep filter
      setFilteredConsultations(consultationsData.filter(c => filter === 'all' ? true : c.status === filter))
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 min-h-0 bg-gray-100 h-full overflow-auto">
      <h1 className="text-3xl font-bold mb-8">Archives des consultations</h1>

      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Toutes
          </button>
          <button
            onClick={() => handleFilterChange("active")}
            className={`px-4 py-2 rounded-lg ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Actives
          </button>
          <button
            onClick={() => handleFilterChange("closed")}
            className={`px-4 py-2 rounded-lg ${filter === "closed" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Fermées
          </button>
          <button
            onClick={() => handleFilterChange("archived")}
            className={`px-4 py-2 rounded-lg ${filter === "archived" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Archivées
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-gray-600">Chargement des consultations...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Liste des consultations</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredConsultations.length === 0 ? (
                <p className="text-gray-500">Aucune consultation trouvée.</p>
              ) : (
                filteredConsultations.map((consultation) => (
                  <div
                    key={consultation._id}
                    className={`border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 ${selectedConsultation?._id === consultation._id ? 'bg-blue-50 border-blue-300' : ''}`}
                    onClick={() => handleConsultationClick(consultation)}
                  >
                    <h3 className="text-lg font-semibold">{consultation.title}</h3>
                    <p className="text-gray-600 text-sm">{consultation.description}</p>
                    <div className="mt-2 text-sm text-gray-500 flex items-center gap-3">
                      <span>Arrondissement: {consultation.arrondissement}</span>
                      <StatusBadge status={consultation.status} />
                      <span>Créée le: {new Date(consultation.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-2">
                      {/* Actions */}
                      {consultation.status === 'active' && (
                        <button onClick={async () => { try { await consultationService.closeConsultation(consultation._id); await reloadData(); } catch(e){ alert('Erreur'); } }} className="px-3 py-1 bg-orange-500 text-white rounded">Fermer les votes</button>
                      )}
                      {consultation.status === 'closed' && (
                        <button onClick={async () => { try { await consultationService.archiveConsultation(consultation._id); await reloadData(); } catch(e){ alert(e?.response?.data?.message || 'Impossible d\'archiver') } }} className={`px-3 py-1 rounded ${getEngagementsForConsultation(consultation._id).some(en => en.status === 'completed' || en.progress === 100) ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`} disabled={!getEngagementsForConsultation(consultation._id).some(en => en.status === 'completed' || en.progress === 100)}>
                          Archiver
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            {selectedConsultation ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Détails de la consultation</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedConsultation.title}</h3>
                    <p className="text-gray-600">{selectedConsultation.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Résultats des votes</h4>
                    {consultationStats ? (
                      <div className="space-y-2">
                        <p>Total votes: {consultationStats.totalVotes}</p>
                        <p>Oui: {consultationStats.yes}</p>
                        <p>Non: {consultationStats.no}</p>
                        <p>Abstention: {consultationStats.abstain}</p>
                      </div>
                    ) : (
                      <p>Chargement des résultats...</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Engagements liés</h4>
                    <div className="space-y-2">
                      {getEngagementsForConsultation(selectedConsultation._id).map((engagement) => (
                        <div key={engagement._id} className="border border-gray-200 rounded p-2">
                          <p className="text-sm text-gray-600">{engagement.description}</p>
                          <p className="text-sm text-gray-500">Statut: {engagement.status} | Progression: {engagement.progress}%</p>
                        </div>
                      ))}
                      {getEngagementsForConsultation(selectedConsultation._id).length === 0 && (
                        <p className="text-gray-500">Aucun engagement lié.</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">
                <p>Sélectionnez une consultation pour voir les détails</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    active: 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs',
    closed: 'bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs',
    archived: 'bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs'
  }
  return <span className={map[status] || 'bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs'}>{status}</span>
}


export default ArchivesConsultation;