import { useState, useEffect } from "react";
import { getAllExperts } from "../api/expertApi";
import { getAvailability } from "../api/availabilityApi";
import { createBooking } from "../api/bookingApi";

export default function BookingPage() {
  const [experts, setExperts] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [availability, setAvailabilityData] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Select Expert, 2: Select Time, 3: Payment

  useEffect(() => {
    loadExperts();
  }, []);

  async function loadExperts() {
    try {
      const data = await getAllExperts();
      setExperts(data);
    } catch (err) {
      console.error("Failed to load experts", err);
    }
  }

  async function handleExpertSelect(expert) {
    setSelectedExpert(expert);
    setStep(2);

    try {
      const slots = await getAvailability(expert.id);
      setAvailabilityData(slots);
    } catch (err) {
      console.error("Failed to load availability", err);
      setAvailabilityData([]);
    }
  }

  function handleSlotSelect(slot) {
    setSelectedSlot(slot);
    setStep(3);
  }

  async function handlePayment() {
    setLoading(true);

    try {
      // Stripe Checkout Integration
      alert(
        "Stripe Payment Integration:\n\n" +
          `Expert: ${selectedExpert.name}\n` +
          `Rate: ₹${selectedExpert.pricePerHour}/hour\n` +
          `Time: ${selectedSlot.startTime}\n\n` +
          "In production, this will:\n" +
          "1. Create Stripe checkout session\n" +
          "2. Redirect to Stripe payment page\n" +
          "3. Handle payment success callback\n" +
          "4. Create booking after payment"
      );

      // Simulate booking creation
      await createBooking(
        selectedExpert.id,
        selectedSlot.startTime,
        selectedSlot.endTime
      );

      alert("Booking confirmed! (In production, this happens after payment)");
      
      // Reset state
      setSelectedExpert(null);
      setSelectedSlot(null);
      setStep(1);
    } catch (err) {
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Book a Session</h1>
        <p className="mt-1 text-gray-600">
          Schedule a 1-on-1 consultation with an expert
        </p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <Step number={1} active={step >= 1} completed={step > 1} label="Select Expert" />
          <div className={`flex-1 h-1 mx-4 ${step > 1 ? "bg-linkedin" : "bg-gray-200"}`}></div>
          <Step number={2} active={step >= 2} completed={step > 2} label="Choose Time" />
          <div className={`flex-1 h-1 mx-4 ${step > 2 ? "bg-linkedin" : "bg-gray-200"}`}></div>
          <Step number={3} active={step >= 3} completed={false} label="Payment" />
        </div>
      </div>

      {/* Step 1: Select Expert */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 cursor-pointer"
              onClick={() => handleExpertSelect(expert)}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-16 h-16 bg-linkedin rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {expert.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {expert.name}
                    </h3>
                    <p className="text-sm text-gray-600">{expert.title}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {expert.skills.split(",").slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-linkedin text-xs font-medium rounded-full"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{expert.bio}</p>

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{expert.pricePerHour}
                      <span className="text-sm font-normal text-gray-500">/hour</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 2: Select Time Slot */}
      {step === 2 && selectedExpert && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Book with {selectedExpert.name}
              </h2>
              <p className="text-sm text-gray-600">{selectedExpert.title}</p>
            </div>
            <button
              onClick={() => {
                setStep(1);
                setSelectedExpert(null);
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Change Expert
            </button>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Available Time Slots
            </h3>

            {availability.length === 0 ? (
              <div className="text-center py-8">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No availability
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  This expert hasn't set their availability yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {availability.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleSlotSelect(slot)}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-linkedin hover:bg-blue-50 transition-all"
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(slot.startTime).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {new Date(slot.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Payment */}
      {step === 3 && selectedExpert && selectedSlot && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Confirm & Pay</h2>

          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Expert</span>
              <span className="font-medium text-gray-900">{selectedExpert.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-medium text-gray-900">
                {new Date(selectedSlot.startTime).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration</span>
              <span className="font-medium text-gray-900">1 hour</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-linkedin">
                ₹{selectedExpert.pricePerHour}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-linkedin text-white py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Proceed to Payment</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setStep(2);
                setSelectedSlot(null);
              }}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors"
            >
              Change Time
            </button>
          </div>

          <div className="flex items-start space-x-2 text-xs text-gray-500">
            <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <p>
              Secure payment powered by Stripe. Your payment information is encrypted
              and secure.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Step({ number, active, completed, label }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
          completed
            ? "bg-linkedin text-white"
            : active
            ? "bg-linkedin text-white"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        {completed ? "✓" : number}
      </div>
      <span className="mt-2 text-xs font-medium text-gray-600">{label}</span>
    </div>
  );
}