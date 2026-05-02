import API from "./api";

const createVote = async (data) => {
  const response = await API.post(
    "/votes",
    data
  );

  return response.data;
};

const getVoteStats = async (consultationId) => {
  const response = await API.get(
    `/votes/stats/${consultationId}`
  );

  return response.data;
};

export default {
  createVote,
  getVoteStats,
};