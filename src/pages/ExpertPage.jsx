import { useEffect, useState } from "react";
import { getAllExperts, createExpert } from "../api/expertApi";

export default function ExpertPage() {
  const [experts, setExperts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    title: "",
    skills: "",
    pricePerHour: "",
    bio: ""
  });

  useEffect(() => {
    getAllExperts().then(data => {
      setExperts(data); // ✅ data IS the array
    });
  }, []);

  async function submit(e) {
    e.preventDefault();
    await createExpert(form);

    setForm({
      name: "",
      title: "",
      skills: "",
      pricePerHour: "",
      bio: ""
    });

    const data = await getAllExperts();
    setExperts(data); // ✅ again, direct array
  }

  return (
    <div className="grid-2">
      {/* LEFT: EXPERT LIST */}
      <div>
        {experts.length === 0 && <p>No experts found</p>}

        {experts.map(expert => (
          <div className="card" key={expert.id}>
            <h3>{expert.name}</h3>
            <p><strong>{expert.title}</strong></p>
            <p>{expert.skills}</p>
            <p>₹{expert.pricePerHour} / hour</p>
            <p>{expert.bio}</p>
          </div>
        ))}
      </div>

      {/* RIGHT: CREATE EXPERT */}
      <div className="card">
        <h3>Create Expert</h3>
        <form onSubmit={submit}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Skills"
            value={form.skills}
            onChange={e => setForm({ ...form, skills: e.target.value })}
          />
          <input
            placeholder="Price per hour"
            value={form.pricePerHour}
            onChange={e => setForm({ ...form, pricePerHour: e.target.value })}
          />
          <textarea
            placeholder="Bio"
            value={form.bio}
            onChange={e => setForm({ ...form, bio: e.target.value })}
          />
          <button>Create Expert</button>
        </form>
      </div>
    </div>
  );
}

