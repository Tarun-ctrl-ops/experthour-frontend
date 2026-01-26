import api from "./client";

export const createPaymentSession = async (
  expertId,
  startTime,
  endTime,
  amount
) => {
  const response = await api.post("/payments/create-session", {
    expertId,
    startTime,
    endTime,
    amount,
    successUrl: `${window.location.origin}/booking-success`,
    cancelUrl: `${window.location.origin}/book`,
  });
  return response.data;
};

export const verifyPayment = async (sessionId) => {
  const response = await api.get(`/payments/verify/${sessionId}`);
  return response.data;
};
