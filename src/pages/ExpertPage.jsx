import { useEffect, useState } from "react";
import { getAllExperts } from "../api/expertApi";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function ExpertPage() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const role = getUserRole();

  useEffect(() => {
    fetchExperts();
  }, []);

  async function fetchExperts() {
    try {
      const data = await getAllExperts();
      setExperts(data);
    } catch {
      setExperts([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="h-10 w-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Find an Expert
          </h1>
          <p className="text-gray-600 mt-1">
            Book 1-on-1 sessions with verified professionals
          </p>
        </div>

        {role === "EXPERT" && (
          <button
            onClick={() => navigate("/availability")}
            className="px-6 py-2 rounded-full bg-brand-primary text-white font-semibold hover:bg-brand-hover"
          >
            Manage Availability
          </button>
        )}
      </div>

      {/* Experts Grid */}
      {experts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experts.map((expert) => (
            <ExpertCard
              key={expert.id}
              expert={expert}
              onBook={() => navigate("/book", { state: { expert } })}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function ExpertCard({ expert, onBook }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-brand-subtle flex items-center justify-center text-brand-primary font-bold text-lg">
          {expert.name?.charAt(0)}
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">
            {expert.name}
          </h3>
          <p className="text-sm text-gray-600">
            {expert.title}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-4 line-clamp-3">
        {expert.bio}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-xl font-bold text-gray-900">
            ₹{expert.pricePerHour}
          </p>
          <p className="text-xs text-gray-500">per hour</p>
        </div>

        <button
          onClick={onBook}
          className="px-5 py-2 rounded-full bg-brand-primary text-white font-semibold hover:bg-brand-hover"
        >
          Book
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center">
      <h3 className="text-lg font-semibold text-gray-900">
        No experts available
      </h3>
      <p className="text-gray-600 mt-2">
        Please check back later
      </p>
    </div>
  );
}
