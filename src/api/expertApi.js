import api from "./client";

export const getAllExperts = () => api.get("/experts").then(r => r.data);
export const createExpert = (data) => api.post("/experts", data);
export const setAvailability = (id, from, to) =>
  api.post(`/experts/${id}/availability`, { from, to });

