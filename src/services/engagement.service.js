import API from "./api";

const createEngagement = async (data) => {
  const response = await API.post(
    "/engagements",
    data
  );

  return response.data;
};

const getEngagements = async () => {
  const response = await API.get(
    "/engagements"
  );

  return response.data;
};

export default {
  createEngagement,
  getEngagements,
};