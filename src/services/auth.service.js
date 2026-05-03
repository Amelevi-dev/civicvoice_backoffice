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
      JSON.stringify(response.data.user || response.data)
    );
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const getUserRole = () => {
  const user = getCurrentUser();
  return user ? user.role : null;
};

const isAdmin = () => {
  return getUserRole() === 'authority';
};

const getToken = () => {
  return localStorage.getItem("token");
};

const isAuthenticated = () => {
  return Boolean(getToken());
};

export default {
  login,
  logout,
  getCurrentUser,
  getUserRole,
  isAdmin,
  getToken,
  isAuthenticated,
};