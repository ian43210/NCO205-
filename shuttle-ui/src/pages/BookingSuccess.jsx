function BookingSuccess({ booking, onGoToTrips, onGoToRoutes }) {
  if (!booking) {
    return (
      <div className="page-screen">
        <div className="page-hero">
          <div className="page-badge">No booking found</div>
          <h2>No Confirmed Booking Yet</h2>
          <p>Book a shuttle route first before viewing confirmation.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-screen">
      <div className="page-hero">
        <div className="page-badge">Booking successful</div>
        <h2>Seat Confirmed</h2>
        <p>Your shuttle reservation was completed successfully.</p>
      </div>

      <article className="mobile-route-card">
        <div className="mobile-route-top">
          <span className="status-pill open">Confirmed</span>
          <span className="total-seats">Seat {booking.seatNumber}</span>
        </div>

        <h3>
          {booking.pickup} → {booking.destination}
        </h3>

        <div className="info-list">
          <div className="info-row">
            <span className="label">Booking status</span>
            <span className="value">Confirmed</span>
          </div>

          <div className="info-row">
            <span className="label">Class start time (SUSS)</span>
            <span className="value">{booking.classStart}</span>
          </div>

          <div className="info-row departure-row">
            <span className="label">Bus departure</span>
            <span className="departure-time">{booking.busDeparture}</span>
          </div>

          <div className="info-row">
            <span className="label">Seat number</span>
            <span className="value">{booking.seatNumber}</span>
          </div>
        </div>

        <div className="route-alert-box success-alert">
          Booking successful. Please arrive before departure and prepare your
          student pass or booking QR for boarding.
        </div>

        <div className="route-card-actions stacked-actions">
          <button className="primary-button" onClick={onGoToTrips}>
            Go to My Trips
          </button>

          <button className="secondary-button" onClick={onGoToRoutes}>
            Back to Routes
          </button>
        </div>
      </article>
    </div>
  )
}

export default BookingSuccess