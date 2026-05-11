import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { HiOutlineCalendar } from 'react-icons/hi';
import consultationService from "../../services/consultation.service";

const CreateConsultation = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      return alert("Vous devez être connecté pour créer une consultation.");
    }

    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate) {
      return alert("Veuillez compléter tous les champs.");
    }

    setIsSubmitting(true);

    try {
      await consultationService.createConsultation(formData);
      alert("Consultation créée avec succès.");
      setFormData({ title: "", description: "", startDate: "", endDate: "" });
    } catch (error) {
      console.error(error);
      if (error?.response?.status === 401) {
        alert("Connexion invalide. Veuillez vous reconnecter.");
      } else if (error?.response?.status === 403) {
        alert("Accès refusé. Vous n'avez pas les droits pour créer une consultation.");
      } else {
        alert("Impossible de créer la consultation.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
    <div className="content w-full h-full flex flex-col justify-start items-start gap-4 overflow-hidden">
      <Navbar title="Nouvelle Consultation" description="Créer une consultation pour recueillir l'avis des citoyens de votre arrondissement" />
      <div className="card flex-1 bg-gray-100 p-4 overflow-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8 h-full max-h-full border border-gray-100 font-sans flex flex-col">
          <form onSubmit={handleSubmit} className="space-y-6 p-4 flex flex-col overflow-auto">
            <div className="mb-3">
              <label className="block text-[#333] font-bold mb-2 text-lg">
                Titre de la consultation
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Réaménagement du marché central"
                className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50/50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent placeholder-gray-400"
              />
            </div>

            <div className="mb-3">
              <label className="block text-[#333] font-bold mb-2 text-lg">
                Question de la consultation
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Rédiger une question claire et concise à laquelle les citoyens pourront répondre par Oui, Non ou Abstention..."
                className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50/50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent placeholder-gray-400 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-4">
              <div className="flex gap-4">
                <div>
                  <label className="block text-[#333] font-bold mb-1 text-lg">
                    Date de début
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <div className="bg-cyan-500/10 p-1.5 rounded-md">
                        <HiOutlineCalendar className="text-cyan-600 text-xl" />
                      </div>
                    </div>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full pl-14 p-3 rounded-lg border border-gray-200 bg-gray-50/50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#333] font-bold mb-1 text-lg">
                    Date de fin
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <div className="bg-cyan-500/10 p-1.5 rounded-md">
                        <HiOutlineCalendar className="text-cyan-600 text-xl" />
                      </div>
                    </div>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full pl-14 p-3 rounded-lg border border-gray-200 bg-gray-50/50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-auto">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orangeClair hover:bg-[#ff6a33] text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 text-lg shadow-md hover:shadow-lg active:scale-95 disabled:opacity-60"
              >
                {isSubmitting ? "Publication..." : "Poster"}
              </button>
            </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateConsultation;
