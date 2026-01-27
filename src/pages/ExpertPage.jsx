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
    } catch (err) {
      console.error("Failed to load experts", err);
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
        pricePerHour: parseFloat(form.pricePerHour),
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
    } catch (err) {
      alert("Failed to create expert profile");
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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-semibold text-gray-900">
          Find an Expert
        </h1>
        <p className="mt-2 text-gray-600 max-w-xl">
          Book 1-on-1 sessions with vetted professionals across technology,
          business, and design.
        </p>
      </div>

      {role !== "EXPERT" && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center rounded-full
            border border-linkedin text-linkedin
            px-6 py-2.5 font-semibold
            hover:bg-linkedin hover:text-white transition"
        >
          Become an Expert
        </button>
      )}
    </div>


      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Create Your Expert Profile
          </h3>

          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent outline-none"
                  placeholder="Senior Software Engineer"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills & Expertise
              </label>
              <input
                type="text"
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent outline-none"
                placeholder="React, Node.js, System Design, AWS"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Separate skills with commas
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hourly Rate (₹)
              </label>
              <input
                type="number"
                value={form.pricePerHour}
                onChange={(e) => setForm({ ...form, pricePerHour: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent outline-none"
                placeholder="2000"
                min="100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent outline-none"
                placeholder="Tell potential clients about your experience and what you can help them with..."
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-linkedin text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Creating Profile..." : "Create Expert Profile"}
            </button>
          </form>
        </div>
      )}

      {experts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No experts yet</h3>
          <p className="mt-1 text-gray-500">Be the first to create an expert profile!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      )}
    </div>
  );
}

function ExpertCard({ expert }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl hover:shadow-md transition">
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-linkedin text-white flex items-center justify-center text-lg font-bold">
            {expert.name.charAt(0)}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 leading-tight">
              {expert.name}
            </h3>
            <p className="text-sm text-gray-600">{expert.title}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {expert.skills.split(",").slice(0, 4).map((skill, i) => (
            <span
              key={i}
              className="text-xs font-medium px-2.5 py-1 rounded-full
                bg-linkedin-light text-linkedin"
            >
              {skill.trim()}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="mt-4 text-sm text-gray-600 line-clamp-3 flex-1">
          {expert.bio}
        </p>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-xl font-semibold text-gray-900">
              ₹{expert.pricePerHour}
            </p>
            <p className="text-xs text-gray-500">per hour</p>
          </div>

          <button
            className="rounded-full bg-linkedin px-5 py-2 text-sm
              font-semibold text-white hover:bg-linkedin-dark transition"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

