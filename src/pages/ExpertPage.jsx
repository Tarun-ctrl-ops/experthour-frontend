import { useEffect, useState } from "react";
import { getAllExperts, createExpert } from "../api/expertApi";
import { getUserRole } from "../utils/auth";

export default function ExpertPage() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    skills: "",
    pricePerHour: "",
    bio: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const role = getUserRole();

  useEffect(() => {
    loadExperts();
  }, []);

  async function loadExperts() {
    setLoading(true);
    try {
      const data = await getAllExperts();
      setExperts(data);
    } finally {
      setLoading(false);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createExpert({
        ...form,
        pricePerHour: Number(form.pricePerHour),
      });
      setForm({
        name: "",
        title: "",
        skills: "",
        pricePerHour: "",
        bio: "",
      });
      setShowForm(false);
      loadExperts();
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-linkedin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-gray-900">
            Find an Expert
          </h1>
          <p className="mt-2 text-gray-600 max-w-xl">
            Book 1-on-1 sessions with vetted professionals.
          </p>
        </div>

        {role !== "EXPERT" && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-full border border-linkedin text-linkedin px-6 py-2.5 font-semibold hover:bg-linkedin hover:text-white transition"
          >
            {showForm ? "Cancel" : "Become an Expert"}
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Create Your Expert Profile
          </h3>

          <form onSubmit={submit} className="space-y-4">
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Skills"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              required
            />
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              placeholder="Price per hour"
              value={form.pricePerHour}
              onChange={(e) =>
                setForm({ ...form, pricePerHour: e.target.value })
              }
              required
            />
            <textarea
              className="w-full border rounded px-3 py-2"
              placeholder="Bio"
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              required
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-linkedin text-white py-2 rounded font-semibold"
            >
              {submitting ? "Creating..." : "Create Expert Profile"}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
      </div>
    </div>
  );
}

function ExpertCard({ expert }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-semibold text-gray-900">{expert.name}</h3>
      <p className="text-sm text-gray-600">{expert.title}</p>
    </div>
  );
}
