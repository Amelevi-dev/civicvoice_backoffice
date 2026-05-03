import React, { useState, useEffect } from 'react';
import PageTransition from '../../components/PageTransition';
import { Navbar } from '../../components/Navbar';
import blockchainService from '../../services/blockchain.service';
import { FaFilePdf, FaCheckShield, FaHistory } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AuditReports = () => {
  const [stats, setStats] = useState(null);
  const [integrity, setIntegrity] = useState(null);

  useEffect(() => {
    const loadAuditData = async () => {
      try {
        const [s, i] = await Promise.all([
          blockchainService.getStats(),
          blockchainService.verifyChain()
        ]);
        setStats(s);
        setIntegrity(i);
      } catch (error) {
        toast.error("Données d'audit indisponibles");
      }
    };
    loadAuditData();
  }, []);

  const handleExport = () => {
    toast.success("Génération du rapport PDF en cours...");
    // Logic for PDF export would go here
  };

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar title="Rapports d'Audit" description="Outils de transparence pour la Société Civile et les Observateurs" />
        
        <div className="p-8 space-y-8 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-bleuFonce mb-6 flex items-center gap-2">
                <FaCheckShield className="text-emerald-500" />
                Certification de l'Intégrité
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-500 font-medium">Statut de la Chaîne</span>
                  <span className={`font-bold ${integrity?.valid ? 'text-emerald-600' : 'text-red-600'}`}>
                    {integrity?.valid ? 'SÉCURISÉ' : 'COMPROMIS'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-500 font-medium">Blocs Audités</span>
                  <span className="font-bold text-bleuFonce">{stats?.totalBlocks}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-bleuFonce mb-4">Exportation Officielle</h3>
              <p className="text-gray-500 text-sm mb-6">
                Générez un rapport certifié contenant l'empreinte cryptographique de chaque consultation et vote enregistré.
              </p>
              <button 
                onClick={handleExport}
                className="flex items-center justify-center gap-3 bg-bleuFonce text-white py-4 rounded-2xl font-bold hover:bg-opacity-90 transition-all shadow-lg"
              >
                <FaFilePdf />
                Télécharger le Rapport d'Audit
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-bleuFonce mb-6 flex items-center gap-2">
              <FaHistory className="text-orangeClair" />
              Journal de l'Observateur
            </h3>
            <div className="overflow-hidden border border-gray-100 rounded-2xl">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Action</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Preuve Blockchain</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-4 font-medium">Initialisation du Registre</td>
                    <td className="px-6 py-4 font-mono text-[10px] text-gray-400">0000x...Genesis</td>
                    <td className="px-6 py-4 text-sm text-gray-500">22/05/2026</td>
                  </tr>
                  {/* More rows would be mapped from a specific audit log API */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AuditReports;