import React, { useState, useEffect } from 'react';
import {
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineChartBar
} from 'react-icons/hi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import StatCard from '../../components/StatCard';
import ChartContainer from '../../components/ChartContainer';
import DoughnutChart from '../../components/DoughnutChart';
import CustomBarChart from '../../components/BarChart';
import { Navbar } from '../../components/Navbar';
import consultationService from '../../services/consultation.service';
import voteService from '../../services/vote.service';
import blockchainService from '../../services/blockchain.service';
import PageTransition from '../../components/PageTransition';

const VotePage = () => {
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultationId, setSelectedConsultationId] = useState('');
  const [stats, setStats] = useState({
    participation: '...',
    tempsRestant: '...',
    totalVotes: '...'
  });
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const consultationsData = await consultationService.getConsultations();
        setConsultations(consultationsData);

        if (consultationsData.length > 0) {
          const firstConsultationId = consultationsData[0]._id;
          setSelectedConsultationId(firstConsultationId);
          await loadVoteStats(firstConsultationId, consultationsData);
        } else {
          setPieData([]);
          setBarData([]);
        }
      } catch (error) {
        toast.error("Erreur lors de la récupération des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadVoteStats = async (consultationId, consultationsList = consultations) => {
    try {
      const results = await voteService.getVoteStats(consultationId);
      const consultation = consultationsList.find((c) => c._id === consultationId);
      const total = results.total || 0;
      const participation = total > 0 ? `${Math.round(((results.yes || 0) + (results.no || 0) + (results.abstain || 0)) / total * 100)} %` : '...';
      const status = consultation ? (consultation.status === 'active' ? 'Active' : 'Fermée') : '...';

      setStats({
        participation,
        tempsRestant: status,
        totalVotes: total
      });

      setPieData([
        { name: 'Oui', value: results.yes || 0, color: '#34E8CD' },
        { name: 'Non', value: results.no || 0, color: '#FF844B' },
        { name: 'Abstention', value: results.abstain || 0, color: '#003C64' }
      ]);

      setBarData([
        { name: 'Oui', v1: results.yes || 0, v2: 0 },
        { name: 'Non', v1: results.no || 0, v2: 0 },
        { name: 'Abstention', v1: results.abstain || 0, v2: 0 }
      ]);
    } catch (error) {
      toast.error("Erreur lors du chargement des statistiques");
    }
  };

  const handleConsultationChange = async (consultationId) => {
    setSelectedConsultationId(consultationId);
    setVerificationResult(null);
    await loadVoteStats(consultationId);
  };

  const verifyResults = async () => {
    setIsVerifying(true);
    const t = toast.loading("Vérification de l'intégrité blockchain...");
    try {
      const result = await blockchainService.verifyChain();
      setVerificationResult(result.valid);
      if (result.valid) {
        toast.success("Registre blockchain certifié conforme", { id: t });
      } else {
        toast.error("ATTENTION : Le registre a été compromis", { id: t });
      }
    } catch (error) {
      toast.error("Échec de la vérification", { id: t });
    } finally {
      setIsVerifying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Chargement des données...
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-gray-100 overflow-auto">
        <Navbar
          title="Vote citoyen"
          description="Suivi des résultats et statistiques"
        />

        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div className="flex-1">
                <label className="block text-lg font-semibold mb-2 text-bleuFonce">Sélectionner une consultation</label>
                <select
                  value={selectedConsultationId}
                  onChange={(e) => handleConsultationChange(e.target.value)}
                  className="w-full max-w-md p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orangeClair"
                >
                  {consultations.map((consultation) => (
                    <option key={consultation._id} value={consultation._id}>
                      {consultation.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={verifyResults}
                disabled={isVerifying}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-md ${verificationResult === true ? 'bg-emerald-500 text-white' : verificationResult === false ? 'bg-red-500 text-white' : 'bg-bleuFonce text-white hover:bg-opacity-90'}`}
              >
                {isVerifying ? 'Analyse...' : verificationResult === true ? 'Résultats Certifiés ✓' : verificationResult === false ? 'Intégrité Compromise ⚠' : 'Certifier les résultats'}
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Taux de participation"
                value={stats.participation}
                label="Citoyens ayant voté"
                icon={HiOutlineUsers}
              />
              <StatCard
                title="Statut"
                value={stats.tempsRestant}
                label="État de la consultation"
                icon={HiOutlineClock}
              />
              <StatCard
                title="Total des votes"
                value={stats.totalVotes}
                label="Votes enregistrés"
                icon={HiOutlineChartBar}
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <ChartContainer title="Répartition des votes">
                <DoughnutChart data={pieData} />
              </ChartContainer>
              <ChartContainer title="Détail des votes">
                <CustomBarChart data={barData} />
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default VotePage;