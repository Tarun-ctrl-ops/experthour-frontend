import api from "./client";

export const getAllExperts = async () => {
  const res = await api.get("/experts");
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};
export const createExpert = (data) => api.post("/experts", data);
export const setAvailability = (id, from, to) =>
  api.put(`/experts/${id}/availability`, { from, to });



