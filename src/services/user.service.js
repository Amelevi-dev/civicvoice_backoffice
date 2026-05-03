import API from "./api";

const getUsers = async () => {
  const response = await API.get("/users");

  return response.data;
};

const approveUser = async (userId) => {
  const response = await API.put(`/users/${userId}/approve`);
  return response.data;
};

export default {
  getUsers,
  approveUser
};