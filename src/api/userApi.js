import api from "./client";

export const register = (data) => api.post("/auth/register", data);
export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data.token; // 👈 ONLY return token
};


