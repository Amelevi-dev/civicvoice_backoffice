import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    try {

      await authService.login({
        ...formData,
        isMobile: false,
      });

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Connexion échouée");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#E3EDF2]">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl w-100 shadow-lg"
      >

        <h1 className="text-3xl font-bold mb-8 text-bleuFonce">
          Connexion
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Nom utilisateur"
          onChange={handleChange}
          className="w-full mb-4 p-4 rounded-lg border"
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          className="w-full mb-6 p-4 rounded-lg border"
        />

        <button
          type="submit"
          className="w-full bg-orangeClair text-white py-4 rounded-xl"
        >
          Se connecter
        </button>

      </form>

    </div>
  );
}

export default Login;