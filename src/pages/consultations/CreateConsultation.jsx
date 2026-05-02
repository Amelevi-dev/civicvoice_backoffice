import { Navbar } from "../../components/Navbar"
import { HiOutlineCalendar } from 'react-icons/hi';

export const NewConsultation = ()=>{
    return (
        <div className="content w-[75%] h-screen flex flex-col justify-start items-start gap-4 overflow-hidden">
            <Navbar title="Nouvelle Consultation" description="Créer une consultation pour recueillir l'avis des citoyens de votre arrondissement" />
            <div className="card flex justify-center items-center flex-1 w-full h-[85%] bg-gray-100 p-4 overflow-auto">
                <div className="bg-white rounded-2xl shadow-sm p-8 w-full h-full max-h-full border border-gray-100 font-sans">
        
        {/* Titre de la consultation */}
        <div className="mb-3">
          <label className="block text-[#333] font-bold mb-2 text-lg">
            Titre de la consultation
          </label>
          <input
            type="text"
            placeholder="Ex: Réaménagement du marché central"
            className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50/50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent placeholder-gray-400"
          />
        </div>

        {/* Question de la consultation */}
        <div className="mb-3">
          <label className="block text-[#333] font-bold mb-2 text-lg">
            Question de la consultation
          </label>
          <textarea
            rows="4"
            placeholder="Rédiger une question claire et concise à laquelle les citoyens pourront répondre par Oui, Non ou Abstention..."
            className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50/50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent placeholder-gray-400 resize-none"
          />
        </div>

        {/* Dates */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-[#333] font-bold mb-1 text-lg">
              Date de début
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Icône stylisée avec un fond bleu clair comme sur l'image */}
                <div className="bg-cyan-500/10 p-1.5 rounded-md">
                  <HiOutlineCalendar className="text-cyan-600 text-xl" />
                </div>
              </div>
              <input
                type="date"
                placeholder="Sélectionner une date"
                className="w-full pl-14 p-3 rounded-lg border border-gray-200 bg-gray-50/50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div className="flex-1">
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
                placeholder="Sélectionner une date"
                className="w-full pl-14 p-3 rounded-lg border border-gray-200 bg-gray-50/50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>
        </div>

        {/* Bouton */}
        <div className="flex justify-end">
          <button className="bg-orangeClair hover:bg-[#ff6a33] text-white font-bold py-2 px-6 rounded-xl transition-all duration-200 text-lg shadow-md hover:shadow-lg active:scale-95">
            poster
          </button>
        </div>
      </div>
    </div>
        </div>
    )
}