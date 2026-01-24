import { useEffect, useState } from "react";
import { getAllExperts, createExpert } from "../api/expertApi";

export default function ExpertPage() {
  const [experts, setExperts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    title: "",
    skills: "",
    pricePerHour: "",
    bio: "",
  });

  useEffect(() => {
    getAllExperts().then(setExperts);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await createExpert({
      ...form,
      pricePerHour: Number(form.pricePerHour),
    });
    alert("Expert created");
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-4">
        {experts.map((e) => (
          <div
            key={e.id}
            className="bg-white p-6 rounded shadow"
          >
            <h3 className="text-lg font-bold">{e.name}</h3>
            <p className="text-sm text-gray-600">{e.title}</p>
            <p className="mt-2">{e.skills}</p>
            <p className="mt-2 text-linkedin font-semibold">
              ₹{e.pricePerHour}/hr
            </p>
          </div>
        ))}
      </div>

      <form
        onSubmit={submit}
        className="bg-white p-6 rounded shadow space-y-3"
      >
        <h3 className="font-bold">Create Expert</h3>
        {Object.keys(form).map((k) => (
          <input
            key={k}
            placeholder={k}
            className="w-full border px-3 py-2 rounded"
            value={form[k]}
            onChange={(e) =>
              setForm({ ...form, [k]: e.target.value })
            }
          />
        ))}
        <button className="w-full bg-linkedin text-white py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}


