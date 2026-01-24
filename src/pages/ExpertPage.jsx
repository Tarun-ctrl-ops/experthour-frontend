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
    await createExpert({ ...form, pricePerHour: Number(form.pricePerHour) });
    setForm({ name:"", title:"", skills:"", pricePerHour:"", bio:"" });
    loadExperts();
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* LEFT: Experts list */}
      <div className="col-span-2 space-y-4">
        {experts.map(e => (
          <div key={e.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{e.name}</h3>
            <p className="text-sm text-gray-600">{e.title}</p>
            <p className="mt-2 text-sm">{e.skills}</p>
            <p className="mt-2 font-semibold text-blue-600">
              ₹{e.pricePerHour}/hr
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT: Create expert */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-4">Create Expert</h3>

        <form onSubmit={submit} className="space-y-2">
          {Object.keys(form).map(k => (
            <input
              key={k}
              className="w-full border rounded px-2 py-1"
              placeholder={k}
              value={form[k]}
              onChange={e => setForm({ ...form, [k]: e.target.value })}
              required
            />
          ))}
          <button className="w-full bg-blue-600 text-white py-2 rounded mt-2">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

