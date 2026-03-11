function Home() {
  return (
    <div className="page-screen">
      <div className="page-hero">
        <div className="page-badge">Smart campus transport</div>
        <h2>SUSS Campus Shuttle</h2>
        <p>
          Travel conveniently between nearby MRT stations and SUSS with a
          student-focused shuttle booking experience.
        </p>
      </div>

      <section className="home-section-card">
        <div className="home-hero-image-wrap">
          <img
            className="home-hero-image"
            src="/Sample 2.6_Bus exterior.jpg"
            alt="SUSS shuttle bus exterior"
          />
        </div>

        <p className="home-section-label">About the shuttle</p>
        <h3 className="home-section-title">Designed for comfort and convenience</h3>
        <p className="home-section-text">
          The SUSS shuttle service helps students travel to campus more smoothly,
          with planned trip timings, seat booking and a simple boarding flow.
        </p>
      </section>

      <section className="home-section-card">
        <p className="home-section-label">Shuttle amenities</p>
        <h3 className="home-section-title">What students can expect on board</h3>

        <div className="home-feature-list">
          <article className="home-feature-card">
            <img
              className="home-feature-image"
              src="/Sample 2.2_Bus WIFI and clock amenities.jpg"
              alt="Bus WiFi and digital clock amenities"
            />
            <h4>Wi-Fi and digital clock</h4>
            <p>
              Students can stay connected during the journey and keep track of
              time more easily while travelling to class.
            </p>
          </article>

          <article className="home-feature-card">
            <img
              className="home-feature-image"
              src="/Sample 2.3_Seats ergonomic design and overhead compartment.jpg"
              alt="Ergonomic seats and overhead compartment"
            />
            <h4>Comfortable seats and storage</h4>
            <p>
              Ergonomic seats and overhead space help students travel in greater
              comfort while bringing larger personal items.
            </p>
          </article>

          <article className="home-feature-card">
            <img
              className="home-feature-image"
              src="/Sample 2.5_Complimentary snacks and table.jpg"
              alt="Complimentary snacks and foldable table"
            />
            <h4>Refreshments and practical support</h4>
            <p>
              Selected shuttle features include bottled water, snacks, foldable
              table space and a more student-friendly travel experience.
            </p>
          </article>
        </div>
      </section>

      <section className="home-section-card">
        <p className="home-section-label">Quick start</p>
        <h3 className="home-section-title">Plan your journey</h3>
        <p className="home-section-text">
          View available routes, choose your preferred trip timing and reserve
          a seat before the bus departs.
        </p>

        <div className="home-action-stack">
          <div className="home-action-box">
            <p className="home-action-title">View shuttle routes</p>
            <p className="home-action-text">
              Compare boarding stations, trip timings and live seat
              availability.
            </p>
          </div>

          <div className="home-action-box">
            <p className="home-action-title">Book your seat</p>
            <p className="home-action-text">
              Confirm your shuttle, read the booking terms and choose one seat
              before boarding.
            </p>
          </div>

          <div className="home-action-box">
            <p className="home-action-title">Board with QR details</p>
            <p className="home-action-text">
              Access your trip details and QR boarding page after your booking
              is confirmed.
            </p>
          </div>
        </div>
      </section>

      <section className="home-reminder-card">
        <p className="home-reminder-title">Important reminder</p>
        <p className="home-reminder-text">
          Please arrive at the pickup location at least 5 minutes before the bus
          departure time. Late arrivals may miss the shuttle.
        </p>
      </section>
    </div>
  )
}

export default Home