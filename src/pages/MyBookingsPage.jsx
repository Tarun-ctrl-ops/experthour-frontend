import { useEffect, useState } from "react";
import { getMyBookings } from "../api/bookingApi";

const STATUS_STYLES = {
  CONFIRMED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-gray-100 text-gray-700",
};

export default function MyBookingsPage({ bookings = [] }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings yet</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white border rounded-xl p-5 flex justify-between"
          >
            <div>
              <h3 className="font-semibold">{b.expert.name}</h3>
              <p className="text-sm text-gray-600">
                {b.startTime}
              </p>
            </div>

            <span className="text-sm font-semibold text-green-600">
              {b.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
}


/* ======================= */
/* Booking Card            */
/* ======================= */

function BookingCard({ booking }) {
  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      {/* LEFT */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {booking.expert.name}
        </h3>

        <div className="text-sm text-gray-600 mt-1">
          {start.toLocaleDateString()} •{" "}
          {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          {" – "}
          {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            STATUS_STYLES[booking.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {booking.status}
        </span>

        <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:border-linkedin hover:text-linkedin transition">
          View
        </button>
      </div>
    </div>
  );
}
