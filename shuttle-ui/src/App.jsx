import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Routes from './pages/Routes'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBookings'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Trips from './pages/Trips'
import BookingSuccess from './pages/BookingSuccess'
import TripDetails from './pages/TripDetails'
import Login from './pages/Login'

function App() {
  const [activePage, setActivePage] = useState('home')
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [activeBooking, setActiveBooking] = useState(null)
  const [loggedInStudent, setLoggedInStudent] = useState(null)

  function handleBookRoute(route) {
    setSelectedRoute(route)
    setActivePage('booking')
  }

  function handleConfirmBooking(bookingDetails) {
    if (activeBooking) {
      alert(
        'You already have 1 active booking. Please use your current trip or cancel it before booking another seat.'
      )
      setActivePage('trips')
      return
    }

    setActiveBooking(bookingDetails)
    setActivePage('booking-success')
  }

  function handleViewConfirmation() {
    setActivePage('booking-success')
  }

  function goToTripDetailsPage() {
    setActivePage('trip-details')
  }

  function goToRoutesPage() {
    setActivePage('routes')
  }

  function goToTripsPage() {
    setActivePage('trips')
  }

  function handleCancelBooking() {
    setActiveBooking(null)
    setSelectedRoute(null)
    setActivePage('routes')
  }

  function handleLogin(studentDetails) {
    setLoggedInStudent(studentDetails)
    setActivePage('home')
  }

  function handleLogout() {
    setLoggedInStudent(null)
    setActiveBooking(null)
    setSelectedRoute(null)
    setActivePage('home')
  }

  function renderPage() {
    if (!loggedInStudent) {
      return <Login onLogin={handleLogin} />
    }

    if (activePage === 'home') return <Home />

    if (activePage === 'routes') {
      return <Routes onBookRoute={handleBookRoute} />
    }

    if (activePage === 'booking') {
      return (
        <Booking
          selectedRoute={selectedRoute}
          activeBooking={activeBooking}
          onConfirmBooking={handleConfirmBooking}
          onCancelBooking={handleCancelBooking}
          onGoToTrips={goToTripsPage}
          onGoToRoutes={goToRoutesPage}
        />
      )
    }

    if (activePage === 'booking-success') {
      return (
        <BookingSuccess
          booking={activeBooking}
          onGoToTrips={goToTripsPage}
          onGoToRoutes={goToRoutesPage}
        />
      )
    }

    if (activePage === 'trip-details') {
      return (
        <TripDetails
          booking={activeBooking}
          onBackToTrips={goToTripsPage}
          onBackToRoutes={goToRoutesPage}
        />
      )
    }

    if (activePage === 'trips') {
      return (
        <Trips
          booking={activeBooking}
          onViewConfirmation={handleViewConfirmation}
          onViewTripDetails={goToTripDetailsPage}
          onCancelBooking={handleCancelBooking}
          onGoToRoutes={goToRoutesPage}
        />
      )
    }

    if (activePage === 'mybookings') {
      return <MyBookings />
    }

    if (activePage === 'help') {
      return <FAQ />
    }

    if (activePage === 'contact') {
      return <Contact />
    }

    return <Home />
  }

  return (
    <div className="app-frame">
      <header className="top-nav">
        <div className="top-nav-row">
          <div className="nav-brand">SUSS Shuttle</div>

          {loggedInStudent && (
            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          )}
        </div>
      </header>

      <main className="screen-content">{renderPage()}</main>

      {loggedInStudent && (
        <nav className="bottom-nav">
          <button
            className={activePage === 'home' ? 'nav-tab active' : 'nav-tab'}
            onClick={() => setActivePage('home')}
          >
            Home
          </button>

          <button
            className={activePage === 'routes' ? 'nav-tab active' : 'nav-tab'}
            onClick={() => setActivePage('routes')}
          >
            Routes
          </button>

          <button
            className={activePage === 'booking' ? 'nav-tab active' : 'nav-tab'}
            onClick={() => setActivePage('booking')}
          >
            Book
          </button>

          <button
            className={
              activePage === 'trips' ||
              activePage === 'booking-success' ||
              activePage === 'trip-details'
                ? 'nav-tab active'
                : 'nav-tab'
            }
            onClick={() => setActivePage('trips')}
          >
            Trips
          </button>

          <button
            className={activePage === 'help' ? 'nav-tab active' : 'nav-tab'}
            onClick={() => setActivePage('help')}
          >
            Help
          </button>
        </nav>
      )}
    </div>
  )
}

export default App