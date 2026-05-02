import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";

export const Engagements = () => {
  // 1. États pour stocker les résultats de la base de données
  const [resultats, setResultats] = useState({
    titre: "...",
    totalVotes: 0,
    gagnant: "...",
    scoreGagnant: 0,
    repartition: { oui: 0, non: 0, abstention: 0 }
  });
  
  // 2. État pour gérer le chargement
  const [isLoading, setIsLoading] = useState(true);

  // 3. État pour capturer le texte tapé par l'élu/l'admin
  const [texteEngagement, setTexteEngagement] = useState("");

  // 4. Récupération des données au montage du composant
  useEffect(() => {
    const fetchDonnees = async () => {
      try {
        // --- C'est ici que tu feras ton vrai fetch vers ton API ---
        // const response = await fetch('ton-api.com/consultations/1/resultats');
        // const data = await response.json();
        
        // Simulation de l'appel API (à remplacer)
        setTimeout(() => {
          setResultats({
            titre: "Réaménagement du marché central",
            totalVotes: 1247,
            gagnant: "OUI",
            scoreGagnant: 68,
            repartition: { oui: 68, non: 24, abstention: 8 }
          });
          setIsLoading(false);
        }, 1000);

      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
        setIsLoading(false);
      }
    };

    fetchDonnees();
  }, []);

  // 5. Fonction pour envoyer l'engagement vers la base de données
  const handleSoumettreEngagement = async () => {
    if (!texteEngagement.trim()) {
      alert("Veuillez rédiger un engagement avant de le sceller.");
      return;
    }

    console.log("Envoi à la base de données :", texteEngagement);
    // Exemple d'envoi API :
    // await fetch('ton-api.com/engagements', { 
    //   method: 'POST', 
    //   body: JSON.stringify({ texte: texteEngagement }) 
    // });
    
    alert("Engagement scellé avec succès !");
  };

  return (
    <div className="h-screen flex flex-col w-[75%]">
      <Navbar title="Prise d'Engagement" description="Rédiger votre engagement officiel suite aux résultats de la consultation" />
      <div className="Engagements mt-6 flex-1 min-h-0 bg-gray-100 font-sans overflow-hidden">
        <div className="max-w-2xl mx-auto p-6 h-full overflow-auto">
      
          {/* Affichage pendant le chargement */}
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-500 font-medium">Chargement des résultats...</p>
            </div>
          ) : (
            <>
              {/* Résultat final dynamique */} 
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="flex items-center gap-2 mb-2 text-emerald-600 font-semibold">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>Résultat final</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Le {resultats.gagnant} l'a emporté à {resultats.scoreGagnant}%</h2>
                <p className="text-sm text-gray-500 mb-4">{resultats.titre} — {resultats.totalVotes} votes enregistrés</p>
                
                <div className="flex gap-6 text-sm">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-400"></span> Oui {resultats.repartition.oui}%</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-400"></span> Non {resultats.repartition.non}%</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-400"></span> Abstention {resultats.repartition.abstention}%</div>
                </div>
              </div>

              {/* Formulaire d'engagement contrôlé */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Rédiger l'engagement officiel</h3>
                
                <textarea 
                  value={texteEngagement}
                  onChange={(e) => setTexteEngagement(e.target.value)}
                  className="w-full h-32 p-4 mb-4 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Suite aux résultats de cette consultation citoyenne, nous nous engageons à ...."
                />

                <div className="bg-gray-100 p-4 rounded-lg flex items-start gap-3 mb-6">
                  <div className="text-slate-600 mt-1">🔒</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Engagement permanent</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Attention, une fois publié, cet engagement ne pourra plus être modifié ni effacé. 
                      Cette transparence garantit la confiance des citoyens.
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleSoumettreEngagement}
                  className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Sceller l'engagement
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}