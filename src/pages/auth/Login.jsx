import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import authService from "../../services/auth.service";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const loadingToast = toast.loading("Connexion en cours...");

    try {

      const response = await authService.login({
        ...formData,
        isMobile: false,
      });

      if (response.user.role !== 'authority' && response.user.role !== 'admin') {
        authService.logout();
        toast.error("Accès réservé aux autorités et administrateurs", { id: loadingToast });
        return;
      }

      toast.success(`Bienvenue, ${response.user.name} !`, { id: loadingToast });
      navigate("/");

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Identifiants incorrects", { id: loadingToast });
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#E3EDF2]">

      <motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl w-100 shadow-xl"
      >

        <h1 className="text-3xl font-bold mb-8 text-bleuFonce">
          Connexion
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Nom utilisateur"
            onChange={handleChange}
            className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orangeClair outline-none transition-all"
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orangeClair outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orangeClair text-white py-4 rounded-xl mt-8 font-bold hover:shadow-lg active:scale-95 transition-all"
        >
          Se connecter
        </button>

        <div className="mt-8 text-center">
            <Link to="/register" className="text-bleuFonce font-semibold hover:text-orangeClair transition-colors">
                Demander un accès autorité / observateur
            </Link>
        </div>

      </motion.form>

    </div>
  );
}

export default Login;