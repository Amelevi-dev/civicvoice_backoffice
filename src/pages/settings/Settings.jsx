import { useState, useEffect } from "react";
import authService from "../../services/auth.service";

function Settings() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Erreur lors du chargement des paramètres", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <div className="p-8 min-h-0 bg-gray-100 h-full overflow-auto">
      <h1 className="text-3xl font-bold mb-8">Paramètres</h1>

      {isLoading ? (
        <div className="text-gray-600">Chargement des paramètres...</div>
      ) : (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Informations du compte</h2>
          {user ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <p className="mt-1 text-sm text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rôle</label>
                <p className="mt-1 text-sm text-gray-900">{user.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Arrondissement</label>
                <p className="mt-1 text-sm text-gray-900">{user.arrondissement}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Aucune information utilisateur disponible.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Settings;