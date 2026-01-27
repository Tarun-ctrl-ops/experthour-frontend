import { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 12 }, (_, i) => i + 9); // 9 AM – 8 PM

export default function AvailabilityPage() {
  const [availability, setAvailability] = useState({});

  function toggleSlot(day, hour) {
    const key = `${day}-${hour}`;
    setAvailability((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  async function saveAvailability() {
    try {
      await saveAvailabilityApi(expertId, availability);
      alert("Availability saved");
    } catch {
      alert("Failed to save availability");
    }
  }


  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">
          Weekly Availability
        </h1>
        <p className="text-gray-600 mt-1">
          Select the time slots when you are available for sessions
        </p>
      </header>

      {/* Calendar Grid */}
      <div className="overflow-x-auto bg-white border rounded-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-3 bg-gray-50 text-left text-sm font-medium">
                Time
              </th>
              {DAYS.map((day) => (
                <th
                  key={day}
                  className="border p-3 bg-gray-50 text-sm font-medium text-center"
                >
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
                  const active = availability[key];

                  return (
                    <td
                      key={key}
                      onClick={() => toggleSlot(day, hour)}
                      className={`border h-12 cursor-pointer transition
                        ${
                          active
                            ? "bg-brand-primary text-white"
                            : "hover:bg-gray-100"
                        }`}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <button
          onClick={saveAvailability}
          className="px-6 py-2 rounded-full bg-brand-primary text-white font-semibold hover:bg-brand-hover"
        >
          Save Availability
        </button>
      </div>
    </div>
  );
}
