import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import consultationService from "../../services/consultation.service";
import engagementService from "../../services/engagement.service";

const STATUS_LABEL = {
  pending: 'En attente',
  in_progress: 'En cours',
  completed: 'Réalisé',
  cancelled: 'Annulé'
}

const Engagement = () => {
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultationId, setSelectedConsultationId] = useState("");
  const [texteEngagement, setTexteEngagement] = useState("");
  const [engagements, setEngagements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedForEdit, setSelectedForEdit] = useState(null);

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
        description: texteEngagement
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
  const approvedCount =
  engagements.filter(
    (item) => item.status === "completed"
  ).length;

const rejectedCount =
  engagements.filter(
    (item) => item.status === "cancelled"
  ).length;

const pendingCount =
  engagements.filter(
    (item) =>
      item.status === "pending" ||
      item.status === "in_progress"
  ).length;
  return (
    <div className="h-full flex flex-col w-[90%]">
      <Navbar title="Prise d'Engagement" description="Rédiger votre engagement officiel suite aux résultats de la consultation" />
      <div className="Engagements mt-6 flex-1 min-h-0 bg-gray-100 font-sans overflow-hidden w-full">
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

              {/* Liste des engagements publiés */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Engagements publiés</h3>
                {engagements.length === 0 ? (
                  <p className="text-sm text-gray-500">Aucun engagement publié.</p>
                ) : (
                  <div className="space-y-4">
                    {engagements.map((item) => (
                      <div key={item._id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-slate-800">{item.description}</p>
                            <p className="text-sm text-gray-500">{item.consultationId?.title || ''}</p>
                            <p className="text-sm text-gray-500">{item.authorityId?.institutionName || item.authorityId?.name}</p>
                            <p className="text-sm text-gray-400">{item.authorityId?.arrondissement} {item.authorityId?.quartier ? `· ${item.authorityId.quartier}` : ''}</p>
                          </div>

                          <div className="text-right">
                            <StatusBadge status={item.status} />
                            <div className="mt-2">
                              <div className="w-40 bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div style={{ width: `${item.progress || 0}%` }} className={`h-2 ${progressColorClass(item)}`} />
                              </div>
                              <p className="text-xs text-gray-500 mt-1">Progression: {item.progress || 0}%</p>
                            </div>
                          </div>
                        </div>

                        {/* Bouton ouvrir modal */}
                        <div className="mt-4 flex gap-2">
                          <button onClick={() => setSelectedForEdit(item)} className="text-sm text-white bg-blue-600 px-3 py-1 rounded">Modifier</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal édition */}
              {selectedForEdit && (
                <Modal onClose={() => setSelectedForEdit(null)}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Modifier l'engagement</h3>
                  </div>
                  <EditForm item={selectedForEdit} onUpdated={async (updated) => {
                    setEngagements((prev) => prev.map((e) => e._id === updated._id ? updated : e));
                    setSelectedForEdit(null);
                  }} onDeleted={async (id) => {
                    setEngagements((prev) => prev.filter((e) => e._id !== id));
                    setSelectedForEdit(null);
                  }} />
                </Modal>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

function EditForm({ item, onUpdated, onDeleted }) {
  const [status, setStatus] = useState(item.status || 'pending');
  const [progress, setProgress] = useState(item.progress || 0);
  const [dueDate, setDueDate] = useState(item.dueDate ? new Date(item.dueDate).toISOString().slice(0,10) : '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { status, progress, dueDate: dueDate || null };
      const res = await engagementService.updateEngagement(item._id, payload);
      onUpdated(res.engagement || res);
      alert('Engagement mis à jour');
    } catch (e) {
      console.error(e);
      alert('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Confirmer la suppression de cet engagement ?')) return;
    try {
      await engagementService.deleteEngagement(item._id);
      onDeleted(item._id);
      alert('Engagement supprimé');
    } catch (e) {
      console.error(e);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm text-gray-700">Statut</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border rounded">
            <option value="pending">En attente</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Réalisé</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700">Progression (%)</label>
          <input type="number" min="0" max="100" value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Date limite</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full p-2 border rounded" />
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-emerald-600 text-white rounded">{saving ? 'Enregistrement...' : 'Enregistrer'}</button>
        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Supprimer</button>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-emerald-100 text-emerald-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${map[status] || 'bg-gray-100 text-gray-700'}`}>{STATUS_LABEL[status] || status}</span>
  );
}

function progressColorClass(item) {
  if (item.status === 'completed') return 'bg-emerald-500';
  if (item.status === 'in_progress') return 'bg-blue-500';
  if (item.status === 'cancelled') return 'bg-red-500';
  return 'bg-yellow-500';
}


function Modal({ children, onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose && onClose(), 180);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className={`relative bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 z-10 transform transition-all duration-180 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} role="dialog" aria-modal="true">
        <button onClick={handleClose} aria-label="Fermer" className="absolute top-3 right-3 p-2 rounded hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Engagement;
