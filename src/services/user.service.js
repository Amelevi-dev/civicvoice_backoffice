import API from "./api";

const getUsers = async () => {
  const response = await API.get("/users");

  return response.data;
};

export default {
  getUsers,
};