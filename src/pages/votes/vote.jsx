import React, { useState, useEffect } from 'react';

import {
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineChartBar
} from 'react-icons/hi';

import StatCard from '../../components/StatCard';
import ChartContainer from '../../components/ChartContainer';
import DoughnutChart from '../../components/DoughnutChart';
import CustomBarChart from '../../components/BarChart';
import { Navbar } from '../../components/Navbar';
import consultationService from '../../services/consultation.service';
import voteService from '../../services/vote.service';

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
        console.error('Erreur lors de la récupération des données', error);
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
      console.error('Erreur lors du chargement des statistiques de vote', error);
    }
  };

  const handleConsultationChange = async (consultationId) => {
    setSelectedConsultationId(consultationId);
    await loadVoteStats(consultationId);
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-xl font-semibold">
        Chargement des données...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-0 h-full bg-gray-100">
      <Navbar
        title="Vote citoyen"
        description="Suivi des résultats et statistiques"
      />

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <label className="block text-lg font-semibold mb-4">Sélectionner une consultation</label>
            <select
              value={selectedConsultationId}
              onChange={(e) => handleConsultationChange(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {consultations.map((consultation) => (
                <option key={consultation._id} value={consultation._id}>
                  {consultation.title}
                </option>
              ))}
            </select>
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
  );
};

export default VotePage;