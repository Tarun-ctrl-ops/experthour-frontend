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
    getAllExperts().then(res => {
      setExperts(res.data);
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
    const res = await getAllExperts();
    setExperts(res.data);
  }

  return (
    <div className="grid-2">
      {/* LEFT: EXPERT LIST */}
      <div>
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
          <div className="form-group">
            <input
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <input
              placeholder="Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <input
              placeholder="Skills (comma separated)"
              value={form.skills}
              onChange={e => setForm({ ...form, skills: e.target.value })}
            />
          </div>

          <div className="form-group">
            <input
              placeholder="Price per hour"
              value={form.pricePerHour}
              onChange={e => setForm({ ...form, pricePerHour: e.target.value })}
            />
          </div>

          <div className="form-group">
            <textarea
              placeholder="Bio"
              value={form.bio}
              onChange={e => setForm({ ...form, bio: e.target.value })}
            />
          </div>

          <button>Create Expert</button>
        </form>
      </div>
    </div>
  );
}
