import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAvailability } from "../api/expertApi";
import { createBooking } from "../api/bookingApi";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 12 }, (_, i) => i + 9);

export default function BookingPage() {
  const { state } = useLocation();
  const expert = state?.expert;

  const [availability, setAvailability] = useState({});
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (expert) loadAvailability();
  }, [expert]);

  async function loadAvailability() {
    try {
      const data = await getAvailability(expert.id);
      setAvailability(data);
    } catch {
      setAvailability({});
    } finally {
      setLoading(false);
    }
  }

  async function confirmBooking() {
    if (!selected) {
      alert("Select a time slot");
      return;
    }

    const [day, hour] = selected.split("-");
    const start = `${day} ${hour}:00`;

    await createBooking({
      expertId: expert.id,
      start,
      end: `${day} ${hour + 1}:00`,
    });
  }

  if (!expert) {
    return <p className="text-gray-600">No expert selected</p>;
  }

  if (loading) {
    return <p className="text-gray-600">Loading availability…</p>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">
          Book Session with {expert.name}
        </h1>
        <p className="text-gray-600">
          Select an available time slot
        </p>
      </header>

      <div className="bg-white border rounded-xl overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-3 bg-gray-50 text-sm">Time</th>
              {DAYS.map((day) => (
                <th key={day} className="border p-3 bg-gray-50 text-sm">
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {HOURS.map((hour) => (
              <tr key={hour}>
                <td className="border p-3 text-sm text-gray-600">
                  {hour}:00
                </td>

                {DAYS.map((day) => {
                  const key = `${day}-${hour}`;
                  const available = availability[key];
                  const selectedSlot = selected === key;

                  return (
                    <td
                      key={key}
                      onClick={() =>
                        available && setSelected(key)
                      }
                      className={`border h-12 text-center cursor-pointer transition
                        ${
                          available
                            ? selectedSlot
                              ? "bg-brand-primary text-white"
                              : "hover:bg-brand-subtle"
                            : "bg-gray-100 cursor-not-allowed"
                        }`}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          onClick={confirmBooking}
          disabled={!selected}
          className="px-6 py-2 rounded-full bg-brand-primary text-white font-semibold hover:bg-brand-hover disabled:opacity-50"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
