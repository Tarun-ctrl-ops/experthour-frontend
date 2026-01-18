import api from "./client";

export const createBooking = (expertId, start, end) =>
  api.post("/bookings", {
    expertId,
    start,
    end
  });




