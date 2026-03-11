import { useMemo, useState } from 'react'

function Booking({
  selectedRoute,
  activeBooking,
  onConfirmBooking,
  onCancelBooking,
  onGoToTrips,
  onGoToRoutes,
}) {
  const [bookingStep, setBookingStep] = useState('review')
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  const [hasAgreed, setHasAgreed] = useState(false)

  const seatLayout = useMemo(() => {
    return Array.from({ length: 20 }, (_, index) => {
      const seatNumber = index + 1

      const bookedSeatsByRoute = {
        'Jurong East MRT': [2, 5, 8, 11, 14],
        'Paya Lebar MRT': [1, 3, 6, 9, 12, 15],
        'Bukit Panjang MRT': [4, 7, 10, 13, 16],
      }

      const routeKey = selectedRoute?.pickup || ''
      const bookedSeats = bookedSeatsByRoute[routeKey] || []

      return {
        id: seatNumber,
        label: `A${seatNumber}`,
        isBooked: bookedSeats.includes(seatNumber),
      }
    })
  }, [selectedRoute])

  function handleTermsScroll(event) {
    const element = event.target
    const reachedBottom =
      element.scrollTop + element.clientHeight >= element.scrollHeight - 5

    if (reachedBottom) {
      setHasScrolledToBottom(true)
    }
  }

  function openTermsModal() {
    setShowTermsModal(true)
    setHasScrolledToBottom(false)
    setHasAgreed(false)
  }

  function continueAfterTerms() {
    setShowTermsModal(false)
    setBookingStep('seat-selection')
  }

if (!selectedRoute) {
  return (
    <div className="page-screen">
      <div className="page-hero">
        <div className="page-badge">Seat booking</div>
        <h2>Booking</h2>
        <p>Select a shuttle route first before booking a seat.</p>
      </div>

      <div className="empty-state-card">
        <p className="empty-state-title">No shuttle selected yet</p>
        <p className="empty-state-text">
          Choose your pickup location and trip timing from the Routes page
          before continuing with seat booking.
        </p>

        <div className="route-alert-box">
          You must choose an available shuttle route first.
        </div>

        <div className="route-card-actions">
          <button className="primary-button" onClick={onGoToRoutes}>
            Go to Routes
          </button>
        </div>
      </div>
    </div>
  )
}

  if (activeBooking) {
    return (
      <div className="page-screen">
        <div className="page-hero">
          <div className="page-badge">Booking limit reached</div>
          <h2>One Active Booking Only</h2>
          <p>
            Each login can only hold 1 active shuttle booking at a time so more
            students have a fair chance to book a seat.
          </p>
        </div>

        <article className="mobile-route-card">
          <div className="mobile-route-top">
            <span className="status-pill open">Current Active Booking</span>
            <span className="total-seats">
              Seat {activeBooking.seatNumber || '-'}
            </span>
          </div>

          <h3>
            {activeBooking.pickup} → {activeBooking.destination}
          </h3>

          <div className="info-list">
            <div className="info-row">
              <span className="label">Class start time (SUSS)</span>
              <span className="value">{activeBooking.classStart}</span>
            </div>

            <div className="info-row departure-row">
              <span className="label">Bus departure</span>
              <span className="departure-time">{activeBooking.busDeparture}</span>
            </div>

            <div className="info-row">
              <span className="label">Travel time</span>
              <span className="value">{activeBooking.travelTime}</span>
            </div>
          </div>

          <div className="route-alert-box">
            You already have an active booking. Please complete or cancel that
            trip before booking another shuttle.
          </div>

          <div className="route-card-actions stacked-actions">
            <button className="primary-button" onClick={onGoToTrips}>
              View My Current Booking
            </button>

            <button className="secondary-button" onClick={onCancelBooking}>
              Cancel This Booking
            </button>
          </div>
        </article>
      </div>
    )
  }

  if (bookingStep === 'seat-selection') {
    return (
      <div className="page-screen">
        <div className="page-hero">
          <div className="page-badge">Seat booking</div>
          <h2>Select Your Seat</h2>
          <p>Green = available, red = booked, yellow = selected.</p>
        </div>

        <article className="mobile-route-card">
          <div className="mobile-route-top">
            <span className="status-pill open">Choose 1 seat</span>
            <span className="total-seats">
              {selectedRoute.seatsAvailable}/{selectedRoute.totalSeats} seats left
            </span>
          </div>

          <h3>
            {selectedRoute.pickup} → {selectedRoute.destination}
          </h3>

          <div className="info-list">
            <div className="info-row departure-row">
              <span className="label">Bus departure</span>
              <span className="departure-time">{selectedRoute.busDeparture}</span>
            </div>
          </div>

          <div className="route-alert-box">
            Please choose only 1 seat. Booked seats cannot be selected.
          </div>

          <div className="seat-legend">
            <div className="legend-item">
              <span className="legend-box available-seat"></span>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <span className="legend-box selected-seat"></span>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <span className="legend-box booked-seat"></span>
              <span>Booked</span>
            </div>
          </div>

          <div className="seat-grid">
            {seatLayout.map((seat) => {
              const isSelected = selectedSeat === seat.label

              return (
                <button
                  key={seat.id}
                  className={`seat-button ${
                    seat.isBooked
                      ? 'seat-booked'
                      : isSelected
                      ? 'seat-selected'
                      : 'seat-available'
                  }`}
                  disabled={seat.isBooked}
                  onClick={() => setSelectedSeat(seat.label)}
                >
                  {seat.label}
                </button>
              )
            })}
          </div>

          <div className="route-card-actions stacked-actions">
            <button
              className="secondary-button"
              onClick={() => setBookingStep('review')}
            >
              Back
            </button>

            <button
              className="primary-button"
              disabled={!selectedSeat}
              onClick={() => {
                const confirmedBooking = {
                  ...selectedRoute,
                  seatNumber: selectedSeat,
                  bookingStatus: 'Confirmed',
                }

                onConfirmBooking(confirmedBooking)
              }}
            >
              Confirm Seat
            </button>
          </div>
        </article>
      </div>
    )
  }

  return (
    <div className="page-screen">
      <div className="page-hero">
        <div className="page-badge">Seat booking</div>
        <h2>Confirm Your Shuttle</h2>
        <p>Review your route details before continuing to seat selection.</p>
      </div>

      <article className="mobile-route-card">
        <div className="mobile-route-top">
          <span className="status-pill open">Selected Route</span>
          <span className="total-seats">
            {selectedRoute.seatsAvailable}/{selectedRoute.totalSeats} seats left
          </span>
        </div>

        <h3>
          {selectedRoute.pickup} → {selectedRoute.destination}
        </h3>

        <div className="info-list">
          <div className="info-row">
            <span className="label">Class start time (SUSS)</span>
            <span className="value">{selectedRoute.classStart}</span>
          </div>

          <div className="info-row departure-row">
            <span className="label">Bus departure</span>
            <span className="departure-time">{selectedRoute.busDeparture}</span>
          </div>

          <div className="info-row">
            <span className="label">Travel time</span>
            <span className="value">{selectedRoute.travelTime}</span>
          </div>
        </div>

        <div className="route-alert-box success-alert">
          Seats are available. Please read and agree to the booking terms before
          continuing.
        </div>

        <div className="route-card-actions">
          <button className="primary-button" onClick={openTermsModal}>
            Continue to Seat Selection
          </button>
        </div>
      </article>

      {showTermsModal && (
        <div className="terms-overlay">
          <div className="terms-modal">
            <h3>Booking Terms & Conditions</h3>

            <div className="terms-scroll-box" onScroll={handleTermsScroll}>
              <p>By using this shuttle booking system, you agree to the following:</p>
              <p>1. Only SUSS students may use this shuttle booking system.</p>
              <p>2. Each login can hold only 1 active booking at any time.</p>
              <p>3. Seats are limited to 40 per bus trip.</p>
              <p>4. Once all seats are full, no more bookings can be made for that trip.</p>
              <p>5. Students must select only 1 seat during booking.</p>
              <p>6. Students must arrive at least 5 minutes before bus departure.</p>
              <p>7. Students may be required to show their student pass or booking QR when boarding.</p>
              <p>8. Students should cancel unused bookings to give others a fair chance.</p>
              <p>9. Repeated no-shows may lead to temporary booking restrictions.</p>
              <p>10. Passengers must behave respectfully toward other passengers and the driver.</p>
              <p>11. Passengers must keep the shuttle clean and dispose of any trash responsibly.</p>
              <p>12. Food and drinks must be handled carefully to prevent spills or mess.</p>
              <p>13. Students must not damage shuttle property, fittings, seats, curtains, tables, charging ports, or any equipment on board.</p>
              <p>14. Any misuse, vandalism, or damage to shuttle property may result in disciplinary action or repair liability.</p>
              <p>15. Booking rules are designed to ensure fair access, comfort, and cleanliness for all students.</p>
              <p>16. Please scroll to the end of this terms list before agreeing.</p>
            </div>

            <label className="terms-checkbox-row">
              <input
                type="checkbox"
                checked={hasAgreed}
                disabled={!hasScrolledToBottom}
                onChange={(e) => setHasAgreed(e.target.checked)}
              />
              <span>I have read and agree to the shuttle terms and conditions.</span>
            </label>

            {!hasScrolledToBottom && (
              <p className="terms-helper-text">
                Scroll to the bottom of the terms before you can agree.
              </p>
            )}

            <div className="terms-actions">
              <button
                className="secondary-button"
                onClick={() => setShowTermsModal(false)}
              >
                Cancel
              </button>

              <button
                className="primary-button"
                disabled={!hasScrolledToBottom || !hasAgreed}
                onClick={continueAfterTerms}
              >
                I Agree, Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Booking