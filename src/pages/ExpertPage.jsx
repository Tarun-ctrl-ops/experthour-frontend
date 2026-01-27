import { useEffect, useState } from "react";
import { getAllExperts } from "../api/expertApi";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function ExpertPage() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = getUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    loadExperts();
  }, []);

  async function loadExperts() {
    try {
      const data = await getAllExperts();
      setExperts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load experts", e);
      setExperts([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-linkedin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Find an Expert
          </h1>
          <p className="text-gray-600 mt-1">
            Book 1-on-1 sessions with vetted professionals.
          </p>
        </div>

        {role !== "EXPERT" && (
          <button
            onClick={() => navigate("/experts")}
            className="rounded-full border border-linkedin px-5 py-2 text-sm font-semibold text-linkedin hover:bg-linkedin hover:text-white transition"
          >
            Become an Expert
          </button>
        )}
      </div>

      {/* Empty state */}
      {experts.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-10 text-center text-gray-600">
          No experts available yet.
        </div>
      )}

      {/* Experts Grid */}
      {experts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <ExpertCard
              key={expert.id}
              expert={expert}
              onBook={() => navigate("/book")}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================= */
/* Expert Card                   */
/* ============================= */

function ExpertCard({ expert, onBook }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-full bg-linkedin flex items-center justify-center text-white font-bold text-lg">
          {expert.name?.charAt(0)?.toUpperCase()}
        </div>

        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {expert.name}
          </h3>
          <p className="text-sm text-gray-600">
            {expert.title}
          </p>
        </div>
      </div>

      {/* Skills */}
      {expert.skills && (
        <div className="flex flex-wrap gap-2 mb-4">
          {expert.skills.split(",").map((skill, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full bg-blue-50 text-linkedin font-medium"
            >
              {skill.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Bio */}
      <p className="text-sm text-gray-600 flex-1 mb-4 line-clamp-3">
        {expert.bio}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div>
          <p className="text-xl font-bold text-gray-900">
            ₹{expert.pricePerHour}
          </p>
          <p className="text-xs text-gray-500">per hour</p>
        </div>

        <button
          onClick={onBook}
          className="rounded-full bg-linkedin px-5 py-2 text-sm font-semibold text-white hover:bg-linkedin-dark transition"
        >
          Book
        </button>
      </div>
    </div>
  );
}
