import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import BAMAKO from "../../data/bamako";

function SignupAuthority() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    institutionName: "",
    institutionType: "",
    managerName: "",
    managerRole: "",
    email: "",
    emailOrPhone: "",
    arrondissement: "",
    quartier: "",
    password: "",
    confirmPassword: "",
  });

  const [quartiers, setQuartiers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "arrondissement") {
      setQuartiers(BAMAKO[value] || []);
      setFormData(prev => ({ ...prev, quartier: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await authService.signup({
        ...formData,
        role: "authority",
        name: formData.managerName, // Pour compatibilité
        username: formData.emailOrPhone,
      });

      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      navigate("/login");

    } catch (error) {
      console.log(error);
      alert("Inscription échouée");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E3EDF2] py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl w-full max-w-md shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-8 text-bleuFonce">
          Inscription Autorité
        </h1>

        <input
          type="text"
          name="institutionName"
          placeholder="Nom de l'institution"
          value={formData.institutionName}
          onChange={handleChange}
          required
          className="w-full mb-4 p-4 rounded-lg border"
        />

        <input
          type="text"
          name="institutionType"
          placeholder="Type d'institution"
          value={formData.institutionType}
          onChange={handleChange}
          required
          className="w-full mb-4 p-4 rounded-lg border"
        />

        <input
          type="text"
          name="managerName"
          placeholder="Nom du responsable"
          value={formData.managerName}
          onChange={handleChange}
          required
          className="w-full mb-4 p-4 rounded-lg border"
        />

        <input
          type="text"
          name="managerRole"
          placeholder="Rôle du responsable"
          value={formData.managerRole}
          onChange={handleChange}
          required
          className="w-full mb-4 p-4 rounded-lg border"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-4 p-4 rounded-lg border"
        />

        <input
          type="text"
          name="emailOrPhone"
          placeholder="Téléphone ou email alternatif"
          value={formData.emailOrPhone}
          onChange={handleChange}
          required
          className="w-full mb-4 p-4 rounded-lg border"
        />

        <select
          name="arrondissement"
          value={formData.arrondissement}
          onChange={handleChange}
          required
          className="w-full mb-4 p-4 rounded-lg border"
        >
          <option value="">Sélectionner arrondissement</option>
          {Object.keys(BAMAKO).map(arr => (
            <option key={arr} value={arr}>{arr}</option>
          ))}
        </select>

        <select
          name="quartier"
          value={formData.quartier}
          onChange={handleChange}
          required
          disabled={!formData.arrondissement}
          className="w-full mb-4 p-4 rounded-lg border"
        >
          <option value="">Sélectionner quartier</option>
          {quartiers.map(quartier => (
            <option key={quartier} value={quartier}>{quartier}</option>
          ))}
        </select>

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-4 p-4 rounded-lg border"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full mb-6 p-4 rounded-lg border"
        />

        <button
          type="submit"
          className="w-full bg-orangeClair text-white py-4 rounded-xl"
        >
          S'inscrire
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full mt-4 text-blue-500"
        >
          Déjà un compte ? Se connecter
        </button>
      </form>
    </div>
  );
}

export default SignupAuthority;