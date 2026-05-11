import API from "./api";

const createConsultation = async (data) => {
  const response = await API.post(
    "/consultations",
    data
  );

  return response.data;
};

const getConsultations = async () => {
  const response = await API.get(
    "/consultations"
  );

  return response.data;
};

const getConsultationById = async (id) => {
  const response = await API.get(
    `/consultations/${id}`
  );

  return response.data;
};

const closeConsultation = async (id) => {
  const response = await API.patch(`/consultations/${id}/close`);
  return response.data;
};

const archiveConsultation = async (id) => {
  const response = await API.patch(`/consultations/${id}/archive`);
  return response.data;
};

export default {
  createConsultation,
  getConsultations,
  getConsultationById,
  closeConsultation,
  archiveConsultation,
};