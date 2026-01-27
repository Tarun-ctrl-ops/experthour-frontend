import { getToken } from "../utils/auth";

const BASE = import.meta.env.VITE_API_URL;

export async function createBooking(data) {
  const res = await fetch(`${BASE}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Booking failed");
  }

  return res.json();
}

export async function getMyBookings() {
  const res = await fetch(`${BASE}/api/bookings/my`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return res.json();
}
export async function getExpertBookings(expertId) {
  const res = await fetch(
    `${BASE}/api/bookings/expert/${expertId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch expert bookings");
  }

  return res.json();
}
