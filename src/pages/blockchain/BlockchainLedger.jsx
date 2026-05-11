import { useState, useEffect } from "react";
import voteService from "../../services/vote.service";

function BlockchainLedger() {
  const [ledger, setLedger] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLedger = async () => {
      try {
        // Pour l'instant, simuler le ledger blockchain
        // Dans une vraie implémentation, il faudrait un endpoint backend
        const mockLedger = [
          {
            index: 1,
            timestamp: new Date().toISOString(),
            data: "Vote pour consultation #1",
            previousHash: "0",
            hash: "abc123"
          },
          {
            index: 2,
            timestamp: new Date().toISOString(),
            data: "Vote pour consultation #2",
            previousHash: "abc123",
            hash: "def456"
          }
        ];
        setLedger(mockLedger);
      } catch (error) {
        console.error("Erreur lors du chargement du ledger", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLedger();
  }, []);

  return (
    <div className="p-8 min-h-0 bg-gray-100 h-full overflow-auto">
      <h1 className="text-3xl font-bold mb-8">Blockchain Ledger</h1>

      {isLoading ? (
        <div className="text-gray-600">Chargement du ledger...</div>
      ) : (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Historique des blocs</h2>
          <div className="space-y-4">
            {ledger.map((block) => (
              <div key={block.index} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>Index:</strong> {block.index}
                  </div>
                  <div>
                    <strong>Timestamp:</strong> {new Date(block.timestamp).toLocaleString()}
                  </div>
                  <div className="col-span-2">
                    <strong>Data:</strong> {block.data}
                  </div>
                  <div>
                    <strong>Previous Hash:</strong> {block.previousHash}
                  </div>
                  <div>
                    <strong>Hash:</strong> {block.hash}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BlockchainLedger;