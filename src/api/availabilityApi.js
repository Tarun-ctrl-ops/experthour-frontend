import api from "./client";

export const getAvailability = (expertId) =>
  api.get(`/experts/${expertId}/availability`).then(r => r.data);