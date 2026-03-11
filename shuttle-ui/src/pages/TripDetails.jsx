function TripDetails({ booking, onBackToTrips, onBackToRoutes }) {
  if (!booking) {
    return (
      <div className="page-screen">
        <div className="page-hero">
          <div className="page-badge">Trip details</div>
          <h2>No Active Trip Found</h2>
          <p>Please make a booking first before viewing trip details and QR.</p>
        </div>
      </div>
    )
  }

  const qrText = `${booking.pickup}-${booking.classStart}-${booking.seatNumber}`

  return (
    <div className="page-screen">
      <div className="page-hero">
        <div className="page-badge">Boarding pass</div>
        <h2>Trip Details & QR</h2>
        <p>Show this page when boarding the shuttle.</p>
      </div>

      <article className="mobile-route-card">
        <div className="mobile-route-top">
          <span className="status-pill open">Ready to Board</span>
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

        <div className="qr-card">
          <p className="qr-title">Boarding QR</p>

          <div className="mock-qr">
            <div className="qr-grid">
              {Array.from({ length: 64 }, (_, index) => (
                <span
                  key={index}
                  className={index % 2 === 0 || index % 5 === 0 ? 'qr-cell dark' : 'qr-cell'}
                ></span>
              ))}
            </div>
          </div>

          <p className="qr-code-text">{qrText}</p>
        </div>

        <div className="route-alert-box success-alert">
          Please arrive early and prepare this QR or your student pass for
          boarding verification.
        </div>

        <div className="route-card-actions stacked-actions">
          <button className="primary-button" onClick={onBackToTrips}>
            Back to My Trips
          </button>

          <button className="secondary-button" onClick={onBackToRoutes}>
            Back to Routes
          </button>
        </div>
      </article>
    </div>
  )
}

export default TripDetails