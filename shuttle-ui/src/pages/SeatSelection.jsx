import { useState } from "react"

function SeatSelection({ route, onConfirmSeat }) {
  const [selectedSeat, setSelectedSeat] = useState(null)

  const seats = Array.from({ length: 8 }, (_, i) => i + 1)

  return (
    <div className="page-screen">

      <div className="page-hero">
        <div className="page-badge">Seat selection</div>
        <h2>Select Your Seat</h2>
        <p>Choose an available seat for your shuttle.</p>
      </div>

      <div className="seat-bus">

        <div className="driver-label">
          Driver
        </div>

        <div className="seat-grid">

          {seats.map((seat) => (
            <button
              key={seat}
              className={
                selectedSeat === seat
                  ? "seat-button selected-seat"
                  : "seat-button"
              }
              onClick={() => setSelectedSeat(seat)}
            >
              {seat}
            </button>
          ))}

        </div>

      </div>

      {selectedSeat && (
        <div className="seat-confirm">

          <p className="seat-selected-text">
            Selected seat: <strong>{selectedSeat}</strong>
          </p>

          <button
            className="primary-button"
            onClick={() =>
              onConfirmSeat({
                ...route,
                seatNumber: selectedSeat
              })
            }
          >
            Confirm Booking
          </button>

        </div>
      )}

    </div>
  )
}

export default SeatSelection