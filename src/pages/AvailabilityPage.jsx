import { useEffect, useState } from "react";
import { getAllExperts, setAvailability } from "../api/expertApi";

export default function AvailabilityPage() {
  const [experts, setExperts] = useState([]);
  const [expertId, setExpertId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    getAllExperts().then(setExperts);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await setAvailability(expertId, from, to);
    alert("Availability updated");
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        Set Availability
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <select
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setExpertId(e.target.value)}
        >
          <option>Select Expert</option>
          {experts.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>

        <input
          placeholder="From (09:00)"
          className="w-full border px-3 py-2 rounded"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          placeholder="To (17:00)"
          className="w-full border px-3 py-2 rounded"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <button className="w-full bg-linkedin text-white py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}

