import { useMemo, useState } from 'react'

const shuttleRoutes = [
  {
    id: 1,
    pickup: 'Jurong East MRT',
    destination: 'SUSS',
    classStart: '08:30 AM',
    busDeparture: '07:40 AM',
    travelTime: '35 mins',
    seatsAvailable: 35,
    totalSeats: 40,
    status: 'Available',
    mapsUrl:
      'https://www.google.com/maps/dir/Jurong+East+MRT/Singapore+University+of+Social+Sciences',
  },
  {
    id: 2,
    pickup: 'Jurong East MRT',
    destination: 'SUSS',
    classStart: '12:00 PM',
    busDeparture: '11:10 AM',
    travelTime: '35 mins',
    seatsAvailable: 18,
    totalSeats: 40,
    status: 'Available',
    mapsUrl:
      'https://www.google.com/maps/dir/Jurong+East+MRT/Singapore+University+of+Social+Sciences',
  },
  {
    id: 3,
    pickup: 'Jurong East MRT',
    destination: 'SUSS',
    classStart: '03:30 PM',
    busDeparture: '02:40 PM',
    travelTime: '35 mins',
    seatsAvailable: 6,
    totalSeats: 40,
    status: 'Available',
    mapsUrl:
      'https://www.google.com/maps/dir/Jurong+East+MRT/Singapore+University+of+Social+Sciences',
  },
  {
    id: 4,
    pickup: 'Jurong East MRT',
    destination: 'SUSS',
    classStart: '07:00 PM',
    busDeparture: '06:10 PM',
    travelTime: '35 mins',
    seatsAvailable: 0,
    totalSeats: 40,
    status: 'Full',
    mapsUrl:
      'https://www.google.com/maps/dir/Jurong+East+MRT/Singapore+University+of+Social+Sciences',
  },
  {
    id: 5,
    pickup: 'Paya Lebar MRT',
    destination: 'SUSS',
    classStart: '08:30 AM',
    busDeparture: '07:25 AM',
    travelTime: '50 mins',
    seatsAvailable: 22,
    totalSeats: 40,
    status: 'Available',
    mapsUrl:
      'https://www.google.com/maps/dir/Paya+Lebar+MRT/Singapore+University+of+Social+Sciences',
  },
  {
    id: 6,
    pickup: 'Paya Lebar MRT',
    destination: 'SUSS',
    classStart: '12:00 PM',
    busDeparture: '10:55 AM',
    travelTime: '50 mins',
    seatsAvailable: 0,
    totalSeats: 40,
    status: 'Full',
    mapsUrl:
      'https://www.google.com/maps/dir/Paya+Lebar+MRT/Singapore+University+of+Social+Sciences',
  },
  {
    id: 7,
    pickup: 'Paya Lebar MRT',
    destination: 'SUSS',
    classStart: '03:30 PM',
    busDeparture: '02:25 PM',
    travelTime: '50 mins',
    seatsAvailable: 14,
    totalSeats: 40,
    status: 'Available',
    mapsUrl:
      'https://www.google.com/maps/dir/Paya+Lebar+MRT/Singapore+University+of+Social+Sciences',
  },
  {
    id: 8,
    pickup: 'Paya Lebar MRT',
    destination: 'SUSS',
    classStart: '07:00 PM',
    busDeparture: '05:55 PM',
    travelTime: '50 mins',
    seatsAvailable: 4,
    totalSeats: 40,
    status: 'Available',
    mapsUrl:
      'https://www.google.com/maps/dir/Paya+Lebar+MRT/Singapore+University+of+Social+Sciences',
  },
  {
    id: 9,
    pickup: 'Bukit Panjang MRT',
    destination: 'SUSS',
    classStart: '08:30 AM',
    busDeparture: '07:45 AM',
    travelTime: '30 mins',
    seatsAvailable: 28,
    totalSeats: 40,
    status: 'Available',
    mapsUrl:
      'https://www.google.com/maps/dir/Bukit+Panjang+MRT/Singapore+University+of+Social+Sciences',
  },
  {
    id: 10,
    pickup: 'Bukit Panjang MRT',
    destination: 'SUSS',
    classStart: '12:00 PM',
    busDeparture: '11:15 AM',
    travelTime: '30 mins',
    seatsAvailable: 16,
    totalSeats: 40,
    status: 'Available',
    mapsUrl:
      'https://www.google.com/maps/dir/Bukit+Panjang+MRT/Singapore+University+of+Social+Sciences',
  },
  {
    id: 11,
    pickup: 'Bukit Panjang MRT',
    destination: 'SUSS',
    classStart: '03:30 PM',
    busDeparture: '02:45 PM',
    travelTime: '30 mins',
    seatsAvailable: 12,
    totalSeats: 40,
    status: 'Available',
    mapsUrl:
      'https://www.google.com/maps/dir/Bukit+Panjang+MRT/Singapore+University+of+Social+Sciences',
  },
  {
    id: 12,
    pickup: 'Bukit Panjang MRT',
    destination: 'SUSS',
    classStart: '07:00 PM',
    busDeparture: '06:15 PM',
    travelTime: '30 mins',
    seatsAvailable: 0,
    totalSeats: 40,
    status: 'Full',
    mapsUrl:
      'https://www.google.com/maps/dir/Bukit+Panjang+MRT/Singapore+University+of+Social+Sciences',
  },
]

const pickupOptions = [
  'Jurong East MRT',
  'Paya Lebar MRT',
  'Bukit Panjang MRT',
]

const timeOptions = ['08:30 AM', '12:00 PM', '03:30 PM', '07:00 PM']

function Routes({ onBookRoute }) {
  const [selectedPickup, setSelectedPickup] = useState('Jurong East MRT')
  const [selectedTime, setSelectedTime] = useState('08:30 AM')

  const routesForPickup = useMemo(() => {
    return shuttleRoutes.filter((route) => route.pickup === selectedPickup)
  }, [selectedPickup])

  const selectedRoute = useMemo(() => {
    return shuttleRoutes.find(
      (route) =>
        route.pickup === selectedPickup && route.classStart === selectedTime
    )
  }, [selectedPickup, selectedTime])
  
  const alternativeRoutes = useMemo(() => {
    if (!selectedRoute || selectedRoute.seatsAvailable > 0) return []

    return shuttleRoutes.filter(
      (route) =>
        route.classStart === selectedRoute.classStart &&
        route.pickup !== selectedRoute.pickup &&
        route.seatsAvailable > 0
    )
  }, [selectedRoute])

  return (
    <div className="page-screen">
      <div className="page-hero">
        <div className="page-badge">Choose trip clearly</div>
        <h2>Shuttle Routes</h2>
        <p>
          Select your pickup location first, then choose the SUSS class start
          time that fits your lesson schedule.
        </p>
      </div>

      <div className="selector-section">
        <p className="selector-title">1. Pick your boarding station</p>
        <div className="filter-bar">
          {pickupOptions.map((pickup) => (
            <button
              key={pickup}
              className={
                selectedPickup === pickup
                  ? 'filter-pill active-filter'
                  : 'filter-pill'
              }
              onClick={() => {
                setSelectedPickup(pickup)
                setSelectedTime('08:30 AM')
              }}
            >
              {pickup}
            </button>
          ))}
        </div>
      </div>

      <div className="selector-section">
        <p className="selector-title">2. Choose your class start time (SUSS)</p>
        <div className="time-slot-grid">
          {timeOptions.map((time) => {
            const routeForTime = routesForPickup.find(
              (route) => route.classStart === time
            )

            const isFull = routeForTime?.seatsAvailable === 0

            return (
              <button
                key={time}
                className={
                  selectedTime === time
                    ? 'time-slot-button active-time-slot'
                    : 'time-slot-button'
                }
                onClick={() => setSelectedTime(time)}
              >
                <span className="time-slot-main">{time}</span>
                <span className={`time-slot-status ${isFull ? 'slot-full' : 'slot-open'}`}>
                  {isFull ? 'Full' : 'Available'}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {selectedRoute && (
        <article className="mobile-route-card selected-trip-card">
          <div className="mobile-route-top">
            <span
              className={`status-pill ${
                selectedRoute.seatsAvailable === 0 ? 'full' : 'open'
              }`}
            >
              {selectedRoute.status}
            </span>
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

            <div className="info-row">
              <span className="label">Bus departure time</span>
              <span className="value">{selectedRoute.busDeparture}</span>
            </div>

            <div className="info-row">
              <span className="label">Travel time</span>
              <span className="value">{selectedRoute.travelTime}</span>
            </div>
          </div>

          <div className="seat-progress-block">
            <div className="seat-progress-labels">
              <span>Seat occupancy</span>
              <span>
                {selectedRoute.totalSeats - selectedRoute.seatsAvailable}/
                {selectedRoute.totalSeats} taken
              </span>
            </div>

            <div className="seat-progress-track">
              <div
                className={`seat-progress-fill ${
                  selectedRoute.seatsAvailable === 0 ? 'full-fill' : 'open-fill'
                }`}
                style={{
                  width: `${
                    ((selectedRoute.totalSeats - selectedRoute.seatsAvailable) /
                      selectedRoute.totalSeats) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {selectedRoute.seatsAvailable === 0 ? (
            <>
              <div className="route-alert-box">
                This shuttle is full. Try another pickup location for the same
                class start time.
              </div>

              {alternativeRoutes.length > 0 && (
                <div className="alternative-route-box">
                  <p className="alternative-route-title">
                    Other available shuttles for {selectedRoute.classStart}
                  </p>

                  <div className="alternative-route-list">
                    {alternativeRoutes.map((route) => (
                      <button
                        key={route.id}
                        className="alternative-route-item"
                        onClick={() => {
                          setSelectedPickup(route.pickup)
                          setSelectedTime(route.classStart)
                        }}
                      >
                        <span className="alternative-route-main">
                          {route.pickup}
                        </span>
                        <span className="alternative-route-sub">
                          {route.seatsAvailable}/{route.totalSeats} seats left •
                          Bus departs {route.busDeparture}
                        </span>
                        
                        <span className="alternative-route-action">
                            Switch to this shuttle →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="route-alert-box success-alert">
              Seats are available for this selected trip.
            </div>
          )}

          <div className="route-card-actions">
            {selectedRoute.seatsAvailable === 0 ? (
              <a
                className="secondary-button route-link-button"
                href={selectedRoute.mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open Google Maps Route
              </a>
            ) : (
              <button
                className="primary-button"
                onClick={() => onBookRoute(selectedRoute)}
              >
                Book This Shuttle
              </button>
            )}
          </div>
        </article>
      )}
    </div>
  )
}

export default Routes