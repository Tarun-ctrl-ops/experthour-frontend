import { useEffect, useState } from "react";
import { getAllExperts, createExpert } from "../api/expertApi";
import { getUserRole } from "../utils/auth";

export default function ExpertPage() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    title: "",
    skills: "",
    pricePerHour: "",
    bio: "",
  });

  const role = getUserRole();

  useEffect(() => {
    loadExperts();
  }, []);

  async function loadExperts() {
    try {
      const data = await getAllExperts();
      setExperts(data);
    } catch (e) {
      console.error("Failed to load experts", e);
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
    } catch {
      alert("Failed to create expert profile");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-linkedin border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Find an Expert
          </h1>
          <p className="mt-1 text-gray-600">
            Book 1-on-1 sessions with vetted professionals.
          </p>
        </div>

        {role !== "EXPERT" && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-linkedin text-white px-6 py-2.5 rounded-full font-semibold hover:bg-linkedin-dark"
          >
            {showForm ? "Cancel" : "Become an Expert"}
          </button>
        )}
      </div>

      {/* CREATE EXPERT FORM */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Create Expert Profile
          </h2>

          <form onSubmit={submit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <Input
                label="Title"
                value={form.title}
                onChange={(v) => setForm({ ...form, title: v })}
              />
            </div>

            <Input
              label="Skills (comma separated)"
              value={form.skills}
              onChange={(v) => setForm({ ...form, skills: v })}
            />

            <Input
              label="Hourly Rate (₹)"
              type="number"
              value={form.pricePerHour}
              onChange={(v) => setForm({ ...form, pricePerHour: v })}
            />

            <Textarea
              label="Bio"
              value={form.bio}
              onChange={(v) => setForm({ ...form, bio: v })}
            />

            <button
              disabled={submitting}
              className="w-full bg-linkedin text-white py-3 rounded-full font-semibold disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Create Profile"}
            </button>
          </form>
        </div>
      )}

      {/* EXPERT LIST */}
      {experts.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-500">
          No experts available yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function ExpertCard({ expert }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-14 w-14 rounded-full bg-linkedin text-white flex items-center justify-center text-xl font-bold">
          {expert.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{expert.name}</h3>
          <p className="text-sm text-gray-600">{expert.title}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {expert.skills.split(",").map((s, i) => (
          <span
            key={i}
            className="text-xs bg-blue-50 text-linkedin px-3 py-1 rounded-full"
          >
            {s.trim()}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {expert.bio}
      </p>

      <div className="flex items-center justify-between border-t pt-4">
        <div>
          <div className="text-xl font-bold">₹{expert.pricePerHour}</div>
          <div className="text-xs text-gray-500">per hour</div>
        </div>

        {/* Booking comes in Phase B */}
        <button
          disabled
          className="px-5 py-2 rounded-full text-sm font-semibold bg-gray-200 text-gray-500 cursor-not-allowed"
        >
          Book
        </button>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-linkedin outline-none"
        required
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-linkedin outline-none"
        required
      />
    </div>
  );
}
