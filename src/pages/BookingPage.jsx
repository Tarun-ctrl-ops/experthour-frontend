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
    alert("Booking created!");
  };

  return (
    <>
      <h2>Book an Expert</h2>

      <form onSubmit={submit}>
        <select value={expertId} onChange={e => setExpertId(e.target.value)} required>
          <option value="">Select Expert</option>
          {experts.map(e => (
            <option key={e.id} value={e.id}>
              {e.name} ({e.availableFrom} - {e.availableTo})
            </option>
          ))}
        </select>

        <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} required />
        <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} required />

        <button>Book</button>
      </form>
    </>
  );
}
