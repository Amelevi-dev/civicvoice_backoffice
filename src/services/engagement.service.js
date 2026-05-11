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

const updateEngagement = async (id, data) => {
  const response = await API.patch(`/engagements/${id}`, data);
  return response.data;
};

const deleteEngagement = async (id) => {
  const response = await API.delete(`/engagements/${id}`);
  return response.data;
};

export default {
  createEngagement,
  getEngagements,
  updateEngagement,
  deleteEngagement,
};