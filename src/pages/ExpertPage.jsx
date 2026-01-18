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

  const loadExperts = async () => {
    setExperts(await getAllExperts());
  };

  useEffect(() => {
    loadExperts();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await createExpert({
      ...form,
      pricePerHour: Number(form.pricePerHour),
    });
    setForm({ name:"", title:"", skills:"", pricePerHour:"", bio:"" });
    loadExperts();
  };

  return (
    <>
      <h2>Experts</h2>
      <form onSubmit={submit}>
        {Object.keys(form).map(k => (
          <input key={k} value={form[k]}
            onChange={e => setForm({ ...form, [k]: e.target.value })}
            placeholder={k} required />
        ))}
        <button>Create Expert</button>
      </form>

      <ul>
        {Array.isArray(experts) && experts.map(e => (
          <li key={e.id}>{e.name} — {e.skills} — ₹{e.pricePerHour}</li>
        ))}
      </ul>
    </>
  );
}
