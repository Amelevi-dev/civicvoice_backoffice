import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import blockchainService from '../../services/blockchain.service';
import { FaCube, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const Ledger = () => {
  const [blocks, setBlocks] = useState([]);
  const [isValid, setIsValid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blocksData, integrityData] = await Promise.all([
          blockchainService.getBlocks(),
          blockchainService.verifyChain()
        ]);
        setBlocks(blocksData);
        setIsValid(integrityData.valid);
      } catch (error) {
        console.error("Erreur lors de la récupération du registre", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar 
        title="Registre Blockchain" 
        description="Historique immuable de toutes les actions scellées sur le réseau CivicVoice" 
      />

      <div className="p-8 flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Integrity Banner */}
          <div className={`p-4 rounded-2xl flex items-center gap-4 border ${isValid ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            {isValid ? <FaCheckCircle size={24} /> : <FaExclamationTriangle size={24} />}
            <div>
              <p className="font-bold">{isValid ? 'Intégrité de la chaîne vérifiée' : 'Alerte : Intégrité de la chaîne compromise'}</p>
              <p className="text-sm opacity-80">{isValid ? 'Tous les blocs sont correctement liés et signés.' : 'Une modification non autorisée a été détectée dans l\'historique.'}</p>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">Chargement du registre...</div>
          ) : (
            <div className="space-y-4">
              {blocks.map((block) => (
                <div key={block.hash} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-bleuFonce font-bold">
                      <FaCube />
                      <span>BLOC #{block.index}</span>
                    </div>
                    <span className="text-xs font-mono text-gray-400">{block.hash}</span>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Données du Bloc</h4>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <pre className="text-xs overflow-auto">
                          {JSON.stringify(block.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Hash Précédent</h4>
                        <p className="text-xs font-mono break-all text-gray-600">{block.previousHash}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Nonce</h4>
                          <p className="text-sm font-semibold">{block.nonce}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Timestamp</h4>
                          <p className="text-sm font-semibold">{new Date(block.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ledger;