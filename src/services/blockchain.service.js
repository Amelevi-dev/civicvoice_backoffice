import API from "./api";

const getStats = async () => {
  const response = await API.get("/blockchain/stats");
  return response.data;
};

const verifyChain = async () => {
  const response = await API.get("/blockchain/verify");
  return response.data;
};

const getBlocks = async () => {
  const response = await API.get("/blockchain/blocks");
  return response.data;
};

export default {
  getStats,
  verifyChain,
  getBlocks,
};