import { useEffect, useState } from "react";
import { getExperts, createExpert } from "../api/expertApi";

export default function ExpertPage() {
  const [experts, setExperts] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    getExperts().then(setExperts);
  }, []);

  async function submit(e) {
    e.preventDefault();
    await createExpert(form);
    window.location.reload();
  }

  return (
    <div className="grid-2">
      <div>
        {experts.map(e => (
          <div className="card" key={e.id}>
            <h3>{e.name}</h3>
            <p>{e.title}</p>
            <p>{e.skills}</p>
            <strong>₹{e.pricePerHour}/hr</strong>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Create Expert</h3>
        <form onSubmit={submit}>
          {["name", "title", "skills", "pricePerHour", "bio"].map(f => (
            <div className="form-group" key={f}>
              <input placeholder={f} onChange={e => setForm({ ...form, [f]: e.target.value })} />
            </div>
          ))}
          <button>Create</button>
        </form>
      </div>
    </div>
  );
}



