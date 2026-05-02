import API from "./api";

const login = async (data) => {
  const response = await API.post("/auth/signin", data);

  if (response.data.accessToken) {
    localStorage.setItem(
      "token",
      response.data.accessToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data)
    );
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  logout,
  getCurrentUser,
};