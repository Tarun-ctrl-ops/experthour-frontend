import { getToken } from "../utils/auth";

const BASE = import.meta.env.VITE_API_URL;

export async function saveAvailability(expertId, slots) {
  const res = await fetch(
    `${BASE}/api/experts/${expertId}/availability`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ slots }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to save availability");
  }
}
export async function getAvailability(expertId) {
  const res = await fetch(
    `${BASE}/api/experts/${expertId}/availability`
  );

  if (!res.ok) {
    throw new Error("Failed to load availability");
  }

  return res.json();
}
