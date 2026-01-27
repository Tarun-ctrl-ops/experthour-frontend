import { useEffect, useState } from "react";
import { getMyExpertProfile } from "../api/expertApi";
import { getExpertBookings } from "../api/bookingApi";

export default function ExpertBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const expert = await getMyExpertProfile();
      const data = await getExpertBookings(expert.id);
      setBookings(data || []);
    } catch (e) {
      console.error(e);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-linkedin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">
        Upcoming Sessions
      </h1>
      <p className="text-gray-600 mb-8">
        Sessions booked with you.
      </p>

      {bookings.length === 0 && (
        <div className="bg-white border rounded-xl p-10 text-center text-gray-500">
          No sessions booked yet.
        </div>
      )}

      <div className="space-y-4">
        {bookings.map((b) => (
          <ExpertBookingCard key={b.id} booking={b} />
        ))}
      </div>
    </div>
  );
}

function ExpertBookingCard({ booking }) {
  const start = new Date(booking.startTime);

  return (
    <div className="bg-white border rounded-xl p-6 flex justify-between">
      <div>
        <h3 className="font-semibold">
          {booking.user.name}
        </h3>
        <p className="text-sm text-gray-600">
          {start.toLocaleDateString()} •{" "}
          {start.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700 h-fit">
        {booking.status}
      </span>
    </div>
  );
}
