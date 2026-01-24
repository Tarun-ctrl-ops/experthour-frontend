import { useEffect, useState } from "react";
import { getAllExperts } from "../api/expertApi";
import { createBooking } from "../api/bookingApi";

export default function BookingPage() {
  const [experts, setExperts] = useState([]);
  const [expertId, setExpertId] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    getAllExperts().then(setExperts);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await createBooking(expertId, start, end);
    alert("Booking created");
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Book an Expert</h2>

      <form onSubmit={submit} className="space-y-4">
        <select
          className="w-full border rounded px-3 py-2"
          value={expertId}
          onChange={e => setExpertId(e.target.value)}
          required
        >
          <option value="">Select Expert</option>
          {experts.map(e => (
            <option key={e.id} value={e.id}>
              {e.name} ({e.availableFrom}-{e.availableTo})
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          className="w-full border rounded px-3 py-2"
          value={start}
          onChange={e => setStart(e.target.value)}
          required
        />

        <input
          type="datetime-local"
          className="w-full border rounded px-3 py-2"
          value={end}
          onChange={e => setEnd(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Book
        </button>
      </form>
    </div>
  );
}

