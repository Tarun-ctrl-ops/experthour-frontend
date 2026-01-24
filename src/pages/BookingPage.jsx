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
    alert("Booking confirmed");
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        Book an Expert
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <select
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setExpertId(e.target.value)}
        >
          <option>Select Expert</option>
          {experts.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name} ({e.availableFrom}-{e.availableTo})
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          className="w-full border px-3 py-2 rounded"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />

        <input
          type="datetime-local"
          className="w-full border px-3 py-2 rounded"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />

        <button className="w-full bg-linkedin text-white py-2 rounded">
          Book
        </button>
      </form>
    </div>
  );
}


