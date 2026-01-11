import api from "./client";

export const bookExpert = (expertId, start, end) =>
  api.post(`/bookings/${expertId}`, { start, end });

