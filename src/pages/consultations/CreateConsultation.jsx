import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { HiOutlineCalendar } from 'react-icons/hi';
import toast from "react-hot-toast";
import PageTransition from "../../components/PageTransition";
import consultationService from "../../services/consultation.service";

import authService from "../../services/auth.service";

const CreateConsultation = () => {
  const user = authService.getCurrentUser();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    arrondissement: user?.arrondissement || "Commune I (Bamako)",
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

    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate) {
      return toast.error("Veuillez compléter tous les champs.");
    }

    setIsSubmitting(true);
    const t = toast.loading("Publication de la consultation...");

    try {
      await consultationService.createConsultation(formData);
      toast.success("Consultation publiée et scellée sur la blockchain !", { id: t });
      setFormData({
        title: "",
        description: "",
        arrondissement: "Commune I (Bamako)",
        startDate: "",
        endDate: ""
      });
    } catch (error) {
      console.error(error);
      toast.error("Échec de la publication", { id: t });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="content w-full h-screen flex flex-col justify-start items-start gap-4 overflow-hidden bg-gray-100">
        <div className="px-8 pt-8 w-full">
          <Navbar title="Nouvelle Consultation" description="Créer une consultation pour recueillir l'avis des citoyens de votre arrondissement" />
        </div>
        <div className="card flex justify-center items-center flex-1 w-full p-8 overflow-auto">
          <div className="bg-white rounded-3xl shadow-sm p-10 w-full max-w-4xl border border-gray-100 font-sans">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-bleuFonce font-bold text-lg">
                  Objet de la consultation publique
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Construction d'un nouveau forage à Kati"
                  className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orangeClair transition-all placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-bleuFonce font-bold text-lg">
                  Question posée à la population
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Décrivez le projet de façon claire. Le citoyen malien doit pouvoir juger de l'impact direct sur son quotidien (santé, éducation, sécurité)..."
                  className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orangeClair transition-all placeholder-gray-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-bleuFonce font-bold text-lg">
                    Commune / Collectivité
                  </label>
                  <select
                    name="arrondissement"
                    value={formData.arrondissement}
                    onChange={handleChange}
                    disabled={user?.role === 'authority'}
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orangeClair transition-all cursor-pointer disabled:cursor-not-allowed"
                  >
                    <option>Commune I (Bamako)</option>
                    <option>Commune II (Bamako)</option>
                    <option>Commune III (Bamako)</option>
                    <option>Commune IV (Bamako)</option>
                    <option>Commune V (Bamako)</option>
                    <option>Commune VI (Bamako)</option>
                    <option>Cercle de Kati</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="block text-bleuFonce font-bold text-lg">
                      Période de vote
                    </label>
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-orangeClair transition-all"
                        />
                      </div>
                      <div className="relative flex-1">
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-orangeClair transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orangeClair hover:bg-[#ff6a33] text-white font-bold py-4 px-12 rounded-2xl transition-all duration-200 text-lg shadow-lg hover:shadow-orange-200 active:scale-95 disabled:opacity-60"
                >
                  {isSubmitting ? "Publication..." : "Publier et Sceller"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CreateConsultation;