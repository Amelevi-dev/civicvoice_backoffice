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

const VotePage_AccueilPage = () => {

  // ======================
  // States
  // ======================

  const [stats, setStats] = useState({
    participation: '...',
    tempsRestant: '...',
    totalVotes: '...'
  });

  const [pieData, setPieData] = useState([]);

  const [barData, setBarData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // ======================
  // Fetch data
  // ======================

  useEffect(() => {

    const fetchData = async () => {

      try {

        // ======================
        // Simulation API
        // ======================

        setTimeout(() => {

          setStats({
            participation: '45 %',
            tempsRestant: '3j 14h',
            totalVotes: '1247'
          });

          setPieData([
            {
              name: 'Oui',
              value: 68,
              color: '#34E8CD'
            },
            {
              name: 'Non',
              value: 24,
              color: '#FF844B'
            },
            {
              name: 'Abstention',
              value: 8,
              color: '#003C64'
            },
          ]);

          setBarData([
            {
              name: 'Lun',
              v1: 120,
              v2: 50
            },
            {
              name: 'Mar',
              v1: 180,
              v2: 65
            },
            {
              name: 'Mer',
              v1: 260,
              v2: 85
            },
            {
              name: 'Jeu',
              v1: 310,
              v2: 100
            },
            {
              name: 'Ven',
              v1: 420,
              v2: 140
            },
            {
              name: 'Sam',
              v1: 490,
              v2: 160
            },
            {
              name: 'Dim',
              v1: 550,
              v2: 200
            },
          ]);

          setIsLoading(false);

        }, 1000);

      } catch (error) {

        console.error(
          "Erreur lors de la récupération des données",
          error
        );

      }
    };

    fetchData();

  }, []);

  // ======================
  // Loading
  // ======================

  if (isLoading) {

    return (

      <div className="h-screen flex items-center justify-center text-xl font-semibold">

        Chargement des données...

      </div>

    );
  }

  // ======================
  // Render
  // ======================

  return (

    <div className="flex flex-col min-h-screen bg-gray-100">

      {/* Navbar */}

      <Navbar
        title="Vote citoyen"
        description="Suivi des résultats et statistiques"
      />

      {/* Content */}

      <div className="flex-1 p-8">

        <div className="max-w-7xl mx-auto space-y-8">

          {/* Stats */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <StatCard
              title="Taux de participation"
              value={stats.participation}
              label="Citoyens ayant voté"
              icon={HiOutlineUsers}
            />

            <StatCard
              title="Temps restant"
              value={stats.tempsRestant}
              label="Avant clôture"
              icon={HiOutlineClock}
            />

            <StatCard
              title="Total des votes"
              value={stats.totalVotes}
              label="Votes enregistrés"
              icon={HiOutlineChartBar}
            />

          </div>

          {/* Charts */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* Doughnut */}

            <ChartContainer title="Répartition des votes">

              <DoughnutChart data={pieData} />

            </ChartContainer>

            {/* Bar Chart */}

            <ChartContainer title="Evolution quotidienne">

              <CustomBarChart data={barData} />

            </ChartContainer>

          </div>

        </div>

      </div>

    </div>
  );
};

export default VotePage_AccueilPage;