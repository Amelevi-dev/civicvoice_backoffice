import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import authService from "../../services/auth.service";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    emailOrPhone: "",
    password: "",
    role: "authority",
    sexe: "n/A",
    age: "",
    arrondissement: "Premier Arrondissement"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Création du compte...");

    try {
      await authService.signup(formData);
      toast.success("Demande d'accès envoyée ! En attente d'approbation.", { id: loadingToast });
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Erreur lors de l'inscription", { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E3EDF2] py-12">
      <motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl w-full max-w-lg shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-8 text-bleuFonce">
          Demande d'accès
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nom complet"
            required
            onChange={handleChange}
            className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orangeClair outline-none transition-all"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="username"
              placeholder="Nom utilisateur"
              required
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orangeClair outline-none transition-all"
            />
            <input
              type="number"
              name="age"
              placeholder="Âge"
              required
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orangeClair outline-none transition-all"
            />
          </div>

          <input
            type="text"
            name="emailOrPhone"
            placeholder="Téléphone (ou Email principal)"
            required
            onChange={handleChange}
            className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orangeClair outline-none transition-all"
          />

          <input
            type="email"
            name="email"
            placeholder="Email secondaire (optionnel)"
            onChange={handleChange}
            className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orangeClair outline-none transition-all"
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            onChange={handleChange}
            className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orangeClair outline-none transition-all"
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Rôle demandé</label>
              <select
                name="role"
                onChange={handleChange}
                className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orangeClair outline-none transition-all bg-white"
              >
                <option value="authority">Autorité</option>
                <option value="observer">Observateur</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Sexe</label>
              <select
                name="sexe"
                onChange={handleChange}
                className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orangeClair outline-none transition-all bg-white"
              >
                <option value="n/A">n/A</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Arrondissement / Commune</label>
            <select
                name="arrondissement"
                onChange={handleChange}
                className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orangeClair outline-none transition-all bg-white"
            >
                <option>Premier Arrondissement</option>
                <option>Deuxième Arrondissement</option>
                <option>Troisième Arrondissement</option>
                <option>Quatrième Arrondissement</option>
                <option>Cinquième Arrondissement</option>
                <option>Sixième Arrondissement</option>
                <option>Septième Arrondissement</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-bleuFonce text-white py-4 rounded-xl mt-8 font-bold hover:shadow-lg active:scale-95 transition-all"
        >
          Envoyer la demande
        </button>

        <p className="text-center mt-6 text-gray-500">
          Déjà un compte ?{" "}
          <Link to="/login" className="text-orangeClair font-bold hover:underline">
            Se connecter
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

export default Register;
