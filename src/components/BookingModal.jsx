import { useState } from "react";
import { createBooking } from "../api/bookingApi";

export default function BookingModal({ expert, onClose, onSuccess }) {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const checkoutUrl = await startCheckout(booking.id);
  window.location.href = checkoutUrl;


  const slots = [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  async function confirmBooking() {
    setLoading(true);
    try {
      await createBooking({
        expertId: expert.id,
        start: `${date}T${slot}`,
        end: `${date}T${Number(slot.split(":")[0]) + 1}:00`,
      });
      onSuccess();
    } catch {
      alert("Failed to create booking");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Book session</h2>
          <button onClick={onClose} className="text-gray-400">✕</button>
        </div>

        {/* Expert */}
        <div className="mb-6">
          <div className="font-semibold">{expert.name}</div>
          <div className="text-sm text-gray-600">{expert.title}</div>
        </div>

        {/* Date */}
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        {/* Slots */}
        <label className="block text-sm font-medium mb-2">
          Time slot
        </label>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {slots.map((s) => (
            <button
              key={s}
              onClick={() => setSlot(s)}
              className={`border rounded-lg py-2 text-sm ${
                slot === s
                  ? "bg-linkedin text-white border-linkedin"
                  : "hover:border-linkedin"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          disabled={!date || !slot || loading}
          onClick={confirmBooking}
          className="w-full bg-linkedin text-white py-3 rounded-lg font-semibold disabled:opacity-40"
        >
          {loading ? "Booking..." : "Confirm booking"}
        </button>
      </div>
    </div>
  );
}
