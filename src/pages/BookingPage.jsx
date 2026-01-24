export default function BookingPage() {
  return (
    <div className="card" style={{ maxWidth: 500 }}>
      <h2>Book an Expert</h2>

      <div className="form-group">
        <select>
          <option>Select Expert</option>
        </select>
      </div>

      <div className="form-group">
        <input type="datetime-local" />
      </div>

      <button>Book Session</button>
    </div>
  );
}
