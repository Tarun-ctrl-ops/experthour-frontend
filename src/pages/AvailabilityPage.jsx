import { useEffect, useState } from "react";
import { getAllExperts, setAvailability } from "../api/expertApi";

export default function AvailabilityPage() {
  const [experts, setExperts] = useState([]);
  const [selected, setSelected] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    getAllExperts().then(setExperts);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await setAvailability(selected, from, to);
    alert("Availability updated");
  };

  return (
    <>
      <h2>Set Availability</h2>

      <form onSubmit={submit}>
        <select value={selected} onChange={e => setSelected(e.target.value)} required>
          <option value="">Select expert</option>
          {experts.map(e => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>

        <input value={from} onChange={e => setFrom(e.target.value)} placeholder="From (09:00)" />
        <input value={to} onChange={e => setTo(e.target.value)} placeholder="To (17:00)" />

        <button>Save</button>
      </form>
    </>
  );
}
