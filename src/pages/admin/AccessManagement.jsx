import React, { useState, useEffect } from 'react';
import PageTransition from '../../components/PageTransition';
import { Navbar } from '../../components/Navbar';
import userService from '../../services/user.service';
import { FaUserCheck, FaUserClock, FaShieldAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AccessManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des utilisateurs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleApprove = async (userId) => {
    const t = toast.loading("Approbation en cours...");
    try {
      await userService.approveUser(userId);
      toast.success("Utilisateur approuvé avec succès", { id: t });
      loadUsers();
    } catch (error) {
      toast.error("Erreur lors de l'approbation", { id: t });
    }
  };

  const pendingUsers = users.filter(u => u.status === false && (u.role === 'authority' || u.role === 'observer'));
  const approvedUsers = users.filter(u => u.status === true && (u.role === 'authority' || u.role === 'observer'));

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar title="Gestion des Accès" description="Approuver les demandes d'accès pour les Autorités et Observateurs" />
        
        <div className="p-8 space-y-8 max-w-6xl mx-auto w-full">
          {/* Section Pending */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-bleuFonce mb-6 flex items-center gap-2">
              <FaUserClock className="text-orangeClair" />
              Demandes en attente
            </h3>
            
            {isLoading ? (
              <p className="text-gray-400">Chargement...</p>
            ) : pendingUsers.length === 0 ? (
              <p className="text-gray-400 italic">Aucune demande en attente.</p>
            ) : (
              <div className="overflow-hidden border border-gray-100 rounded-2xl">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Utilisateur</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Rôle</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Arrondissement</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pendingUsers.map(user => (
                      <tr key={user._id}>
                        <td className="px-6 py-4">
                          <div className="font-bold text-bleuFonce">{user.name}</div>
                          <div className="text-xs text-gray-400">{user.username}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-orangeClair/10 text-orangeClair text-[10px] font-bold rounded-full uppercase">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{user.arrondissement}</td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleApprove(user._id)}
                            className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all"
                          >
                            <FaUserCheck />
                            Approuver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Section Approved */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-bleuFonce mb-6 flex items-center gap-2">
              <FaShieldAlt className="text-emerald-500" />
              Accès Approuvés
            </h3>
            
            {isLoading ? (
              <p className="text-gray-400">Chargement...</p>
            ) : approvedUsers.length === 0 ? (
              <p className="text-gray-400 italic">Aucun accès approuvé.</p>
            ) : (
              <div className="overflow-hidden border border-gray-100 rounded-2xl">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Utilisateur</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Rôle</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Arrondissement</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {approvedUsers.map(user => (
                      <tr key={user._id}>
                        <td className="px-6 py-4">
                          <div className="font-bold text-bleuFonce">{user.name}</div>
                          <div className="text-xs text-gray-400">{user.username}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-bleuFonce/10 text-bleuFonce text-[10px] font-bold rounded-full uppercase">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{user.arrondissement}</td>
                        <td className="px-6 py-4">
                          <span className="text-emerald-500 font-bold text-sm flex items-center gap-1">
                            <FaUserCheck />
                            Actif
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AccessManagement;
