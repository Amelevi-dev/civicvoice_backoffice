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
    `/votes/results/${consultationId}`
  );

  return response.data;
};

export default {
  createVote,
  getVoteStats,
};