function Trips({
  booking,
  onViewConfirmation,
  onViewTripDetails,
  onCancelBooking,
  onGoToRoutes,
}) {
  return (
    <div className="page-screen">
      <div className="page-hero">
        <div className="page-badge">My trips</div>
        <h2>Your Shuttle Bookings</h2>
        <p>View your upcoming shuttle reservations.</p>
      </div>

      {booking ? (
        <div className="mobile-route-card">
          <div className="mobile-route-top">
            <span className="status-pill open">Booking Confirmed</span>
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
              <span className="label">Class start</span>
              <span className="value">{booking.classStart}</span>
            </div>

            <div className="info-row departure-row">
              <span className="label">Bus departure</span>
              <span className="departure-time">{booking.busDeparture}</span>
            </div>
          </div>

          <div className="route-alert-box success-alert">
            Your upcoming shuttle reservation is confirmed.
          </div>

          <div className="route-card-actions stacked-actions">
            <button className="primary-button" onClick={onViewTripDetails}>
              View Details & QR
            </button>

            <button className="secondary-button" onClick={onGoToRoutes}>
              Back to Routes
            </button>

            <button className="secondary-button danger-button" onClick={onCancelBooking}>
              Cancel This Booking
            </button>
          </div>
        </div>
      ) : (
  <div className="empty-state-card">
    <p className="empty-state-title">No confirmed trips yet</p>
    <p className="empty-state-text">
      Your upcoming shuttle reservations will appear here after a successful
      booking.
    </p>

    <div className="notification-card">
      <p className="notification-title">Travel reminder</p>
      <p className="notification-text">
        Book early to secure a seat, especially for peak class timings like
        8:30 AM and 7:00 PM.
      </p>
    </div>

    <div className="route-alert-box">
      You do not have any confirmed shuttle bookings yet.
    </div>

    <div className="route-card-actions">
      <button className="primary-button" onClick={onGoToRoutes}>
        Go to Routes
      </button>
    </div>
  </div>
)}
    </div>
  )
}

export default Trips