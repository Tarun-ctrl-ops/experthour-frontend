export default function AvailabilityPage() {
  return (
    <div className="card" style={{ maxWidth: 500 }}>
      <h2>Set Availability</h2>

      <div className="form-group">
        <input type="date" />
      </div>

      <div className="form-group">
        <input type="time" />
      </div>

      <div className="form-group">
        <input type="time" />
      </div>

      <button>Save Availability</button>
    </div>
  );
}

