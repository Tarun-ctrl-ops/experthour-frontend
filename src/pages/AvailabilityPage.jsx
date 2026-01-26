import { useState, useEffect } from "react";
import { getAllExperts, setAvailability } from "../api/expertApi";
import { getUserEmail } from "../utils/auth";

export default function AvailabilityPage() {
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([
    { start: "09:00", end: "10:00", selected: false },
    { start: "10:00", end: "11:00", selected: false },
    { start: "11:00", end: "12:00", selected: false },
    { start: "12:00", end: "13:00", selected: false },
    { start: "13:00", end: "14:00", selected: false },
    { start: "14:00", end: "15:00", selected: false },
    { start: "15:00", end: "16:00", selected: false },
    { start: "16:00", end: "17:00", selected: false },
    { start: "17:00", end: "18:00", selected: false },
  ]);
  const [expertId, setExpertId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadExpertProfile();
    setTodayDate();
  }, []);

  function setTodayDate() {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }

  async function loadExpertProfile() {
    try {
      const experts = await getAllExperts();
      const userEmail = getUserEmail();
      const myExpert = experts.find((e) => e.name.includes(userEmail?.split("@")[0]));
      if (myExpert) {
        setExpertId(myExpert.id);
      }
    } catch (err) {
      console.error("Failed to load expert profile", err);
    }
  }

  function toggleSlot(index) {
    const updated = [...timeSlots];
    updated[index].selected = !updated[index].selected;
    setTimeSlots(updated);
  }

  async function handleSave() {
    if (!expertId) {
      alert("Expert profile not found. Please create an expert profile first.");
      return;
    }

    if (!date) {
      alert("Please select a date");
      return;
    }

    const selectedSlots = timeSlots.filter((slot) => slot.selected);
    if (selectedSlots.length === 0) {
      alert("Please select at least one time slot");
      return;
    }

    setLoading(true);
    try {
      const from = `${date}T${selectedSlots[0].start}:00`;
      const to = `${date}T${selectedSlots[selectedSlots.length - 1].end}:00`;

      await setAvailability(expertId, from, to);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Failed to save availability");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleCalendar() {
    alert(
      "Google Calendar Sync:\n\n" +
        "This feature will sync your availability to Google Calendar.\n\n" +
        "Implementation requires:\n" +
        "- Google Calendar API integration\n" +
        "- OAuth 2.0 authentication\n" +
        "- Backend endpoint to create calendar events"
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Your Availability</h1>
        <p className="mt-1 text-gray-600">
          Set your available time slots for consultations
        </p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          ✓ Availability saved successfully!
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Available Time Slots
            </label>
            <button
              onClick={handleGoogleCalendar}
              className="flex items-center space-x-2 text-sm text-linkedin hover:underline"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
              </svg>
              <span>Sync with Google Calendar</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                type="button"
                onClick={() => toggleSlot(index)}
                className={`px-4 py-3 rounded-lg border-2 transition-all ${
                  slot.selected
                    ? "bg-linkedin border-linkedin text-white"
                    : "bg-white border-gray-300 text-gray-700 hover:border-linkedin"
                }`}
              >
                <div className="text-sm font-medium">
                  {slot.start} - {slot.end}
                </div>
              </button>
            ))}
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Click on time slots to toggle availability. You can select multiple slots.
          </p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-linkedin text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Availability"}
          </button>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex">
          <svg
            className="h-5 w-5 text-linkedin mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">Pro Tip</h3>
            <div className="mt-1 text-sm text-gray-700">
              Keep your availability updated to get more booking requests. You can sync
              with Google Calendar to avoid double bookings.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}