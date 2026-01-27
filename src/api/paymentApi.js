import { getToken } from "../utils/auth";

const BASE = import.meta.env.VITE_API_URL;

export async function startCheckout(bookingId) {
  const res = await fetch(`${BASE}/api/payments/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ bookingId }),
  });

  if (!res.ok) {
    throw new Error("Checkout failed");
  }

  return res.text(); // Stripe URL
}
